# Wand Universal Remote

A Home Assistant custom integration plus Lovelace card for building polished, reusable universal remotes without hand-editing large dashboard YAML blocks.

## What this gives you

- A custom integration entry named **Wand Universal Remote**.
- A bundled custom card served from the integration.
- Card picker registration via `window.customCards`.
- A visual card editor for rooms, devices, entities, colors, power behavior, and scripts.
- Entity pickers for remote, media player, and power/status entities.
- Embedded `custom:universal-remote-card` support, so existing platform-specific remote layouts still do the hard work.
- State-aware room/device UI that reacts to `on`, `off`, `playing`, `paused`, `unavailable`, and similar states.
- Room-level and device-level power buttons.
- Switch actions that can run a script/service when a device is selected.
- Custom power on/off actions for devices or whole rooms.
- A manual fallback remote when the universal remote card is disabled or unavailable.

## Install in Home Assistant

Copy `custom_components/wand_remote` into:

```text
/config/custom_components/wand_remote
```

Restart Home Assistant, then go to:

```text
Settings -> Devices & services -> Add integration -> Wand Universal Remote
```

The integration tries to register the card resource automatically. After setup, refresh the browser, open a dashboard, choose **Add card**, and select **Wand Universal Remote**.

If the card does not appear in the picker, add the frontend resource manually:

```text
Settings -> Dashboards -> three dots -> Resources -> Add Resource
URL: /wand_remote/wand-remote-card.js?v=0.2.0
Resource type: JavaScript module
```

Then hard refresh the browser and reopen the card picker. You can also test whether the file is being served by opening:

```text
http://YOUR_HA_ADDRESS:8123/wand_remote/wand-remote-card.js?v=0.2.0
```

If that URL returns 404, the integration has not been added in **Devices & services** or Home Assistant has not restarted after installation.

## Recommended model

Think of the integration as three layers:

- **Integration layer:** installs cleanly, serves the frontend bundle, and registers dashboard resources.
- **Orchestration card:** owns rooms, device switching, power checks, scripts, service calls, status badges, and polished UI.
- **Universal remote renderer:** the existing `custom:universal-remote-card` owns the actual platform remote surface.

That keeps normal users out of YAML while still letting advanced users export or tweak a single card config if needed.

## Device model

Each device can have:

- `remote_id`: used by the embedded universal remote card and fallback remote commands.
- `media_player_id`: used by volume/media services and status.
- `power_entity`: the entity Wand watches for on/off/unavailable state.
- `switch_action`: script/service to call when the user selects the device.
- `power_on_action` and `power_off_action`: optional scripts/services for devices that need a sequence.
- `card_config`: raw universal-remote-card config for advanced cases.

For normal users, the visual editor fills these values with entity pickers and action fields.
