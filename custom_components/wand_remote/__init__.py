"""Wand Universal Remote integration."""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

import voluptuous as vol

from homeassistant.auth.permissions.const import POLICY_READ
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import ATTR_ENTITY_ID, Platform
from homeassistant.core import Context, HomeAssistant, ServiceCall
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType

from .const import CARD_FILENAME, CARD_URL, DOMAIN, STATIC_URL_PATH, VERSION

PLATFORMS: list[Platform] = []
LOGGER = logging.getLogger(__name__)
ATTR_REFRESH_ENTITIES = "entities"


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the integration from YAML, if present."""
    await _async_register_frontend(hass)
    _async_register_services(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Wand Universal Remote from a config entry."""
    await _async_register_frontend(hass)
    _async_register_services(hass)
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = entry.data | {"options": entry.options}
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)
    return True


async def _async_register_frontend(hass: HomeAssistant) -> None:
    """Serve and register the bundled Lovelace card."""
    if hass.data.setdefault(DOMAIN, {}).get("frontend_registered"):
        return

    card_dir = Path(__file__).parent / "www"
    await hass.http.async_register_static_paths(
        [StaticPathConfig(STATIC_URL_PATH, str(card_dir), cache_headers=True)]
    )

    await _async_register_lovelace_resource(hass, f"{CARD_URL}?v={VERSION}")
    hass.data[DOMAIN]["frontend_registered"] = True
    LOGGER.info("Wand Universal Remote frontend served at %s?v=%s", CARD_URL, VERSION)


async def _async_register_lovelace_resource(hass: HomeAssistant, url: str) -> None:
    """Best-effort registration of the dashboard resource."""
    try:
        from homeassistant.components.lovelace import LOVELACE_DATA, resources
    except ImportError:
        return

    try:
        lovelace_data = hass.data.get(LOVELACE_DATA)
        resource_collection = getattr(lovelace_data, "resources", None)
        if resource_collection is not None:
            resource_items = resource_collection.async_items() or []
        else:
            existing = await resources.async_get_info(hass)
            resource_items = existing.get("resources", [])

        for item in resource_items:
            current_url = str(item.get("url", ""))
            if current_url.split("?")[0] != CARD_URL:
                continue
            if current_url == url:
                LOGGER.info(
                    "Wand Universal Remote Lovelace resource is current: %s", url
                )
                return

            resource_id = item.get("id")
            if resource_id:
                data = {"res_type": "module", "url": url}
                if resource_collection is not None:
                    await resource_collection.async_update_item(resource_id, data)
                else:
                    await resources.async_update_item(hass, resource_id, data)
                LOGGER.info(
                    "Wand Universal Remote Lovelace resource updated from %s to %s",
                    current_url,
                    url,
                )
                return

            LOGGER.warning(
                "Could not update the existing Wand resource URL from %s to %s. "
                "Update it manually in Settings > Dashboards > Resources.",
                current_url,
                url,
            )
            return

        data = {"res_type": "module", "url": url}
        if resource_collection is not None:
            await resource_collection.async_create_item(data)
        else:
            await resources.async_create_item(hass, data)
        LOGGER.info("Wand Universal Remote Lovelace resource registered: %s", url)
    except Exception as err:
        # Resource APIs can vary between HA versions and storage modes. The card is
        # still served; users can manually add CARD_URL as a module if needed.
        LOGGER.warning(
            "Could not auto-register Wand Universal Remote Lovelace resource. "
            "Add %s as a JavaScript module resource manually. Error: %s",
            url,
            err,
        )
        return


def _async_register_services(hass: HomeAssistant) -> None:
    """Register small helper services used by advanced card actions."""
    if not hass.services.has_service(DOMAIN, "call_action"):

        async def _async_call_action(call: ServiceCall) -> None:
            data: dict[str, Any] = dict(call.data)
            domain = data.pop("domain", None)
            service = data.pop("service", None)
            target = data.pop("target", None)
            service_data = data.pop("service_data", {})

            if not domain or not service:
                return

            await hass.services.async_call(
                domain,
                service,
                service_data,
                target=target,
                blocking=False,
                context=call.context,
            )

        hass.services.async_register(DOMAIN, "call_action", _async_call_action)

    if not hass.services.has_service(DOMAIN, "refresh_entities"):

        async def _async_refresh_entities(call: ServiceCall) -> None:
            """Reload integrations backing entities visible to the user."""
            entity_ids: list[str] = list(
                dict.fromkeys(call.data[ATTR_REFRESH_ENTITIES])
            )
            if call.context.user_id:
                user = await hass.auth.async_get_user(call.context.user_id)
                if user is None:
                    raise HomeAssistantError("Wand could not identify the current user")
                entity_ids = [
                    entity_id
                    for entity_id in entity_ids
                    if user.permissions.check_entity(entity_id, POLICY_READ)
                ]

            if not entity_ids:
                raise HomeAssistantError(
                    "This user cannot access any entities configured for this remote"
                )

            LOGGER.info(
                "Wand is reloading config entries for: %s", ", ".join(entity_ids)
            )
            # Call the same core service as the original working frontend action.
            # A fresh system context is safe because entity access was checked above
            # and prevents the admin-only wrapper from rejecting a normal user.
            await hass.services.async_call(
                "homeassistant",
                "reload_config_entry",
                {},
                target={ATTR_ENTITY_ID: entity_ids},
                blocking=True,
                context=Context(),
            )

        hass.services.async_register(
            DOMAIN,
            "refresh_entities",
            _async_refresh_entities,
            schema=vol.Schema({vol.Required(ATTR_REFRESH_ENTITIES): cv.entity_ids}),
        )

    if hass.services.has_service(DOMAIN, "reload_frontend"):
        return

    async def _async_reload_frontend(call: ServiceCall) -> None:
        await _async_register_frontend(hass)

    hass.services.async_register(DOMAIN, "reload_frontend", _async_reload_frontend)
