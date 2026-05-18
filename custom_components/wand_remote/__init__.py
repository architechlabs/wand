"""Wand Universal Remote integration."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers.typing import ConfigType

from .const import CARD_FILENAME, CARD_URL, DOMAIN, STATIC_URL_PATH

PLATFORMS: list[Platform] = []


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

    await _async_register_lovelace_resource(hass, f"{CARD_URL}?v=0.1.0")
    hass.data[DOMAIN]["frontend_registered"] = True


async def _async_register_lovelace_resource(hass: HomeAssistant, url: str) -> None:
    """Best-effort registration of the dashboard resource."""
    try:
        from homeassistant.components.lovelace import resources
    except ImportError:
        return

    try:
        existing = await resources.async_get_info(hass)
        for item in existing.get("resources", []):
            if str(item.get("url", "")).split("?")[0] == CARD_URL:
                return

        await resources.async_create_item(
            hass,
            {
                "res_type": "module",
                "url": url,
            },
        )
    except Exception:
        # Resource APIs can vary between HA versions and storage modes. The card is
        # still served; users can manually add CARD_URL as a module if needed.
        return


def _async_register_services(hass: HomeAssistant) -> None:
    """Register small helper services used by advanced card actions."""
    if hass.services.has_service(DOMAIN, "call_action"):
        return

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
        )

    hass.services.async_register(DOMAIN, "call_action", _async_call_action)

