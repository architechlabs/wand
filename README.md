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

### Dashboard-only refresh (no custom component or restart)

Pure HACS/frontend installs can let normal users refresh integrations through one local webhook automation. Wand sends every entity already configured in the selected room, so the automation does not need a duplicate device list.

1. In Home Assistant, open **Settings -> Automations & scenes -> Create automation -> Create new automation**.
2. Open the three-dot menu and select **Edit in YAML**.
3. Replace the generated automation with the YAML below.
4. Replace `REPLACE_WITH_A_LONG_RANDOM_ID` with a private random value, for example `wand_refresh_7f8c2e91b64a43d8a0f559e91bcd742a`.
5. Save the automation. You do not need to restart Home Assistant.

```yaml
alias: Wand dashboard refresh bridge
description: Reload integrations requested by the Wand dashboard card.
mode: queued
max: 3
trigger:
  - platform: webhook
    webhook_id: REPLACE_WITH_A_LONG_RANDOM_ID
    allowed_methods:
      - POST
    local_only: true
condition:
  - condition: template
    value_template: >-
      {{ trigger.json is defined
         and trigger.json.entities is defined
         and (trigger.json.entities | count) > 0 }}
action:
  - service: homeassistant.reload_config_entry
    target:
      entity_id: "{{ trigger.json.entities | list }}"
```

The same template is available at [`examples/wand-dashboard-refresh-automation.yaml`](examples/wand-dashboard-refresh-automation.yaml).

Next, configure the card:

1. Edit the Wand dashboard card.
2. Open **Dashboard-only refresh**.
3. Paste only the webhook ID into **Refresh webhook ID**. Do not paste the URL or `/api/webhook/`.
4. Click outside the field so Home Assistant records the change, then save the card.
5. Open the card as a normal user and press refresh.

When the webhook ID is configured, it takes priority over old area/device refresh actions. Wand automatically posts the selected room's `remote`, `media_player`, power, source, and availability entities. A successful request shows **Remote integration refresh requested**.

To verify it, open the automation and inspect **Traces** after pressing refresh. The trace should contain the entities received in `trigger.json.entities`.

If the card reports HTTP `404`, the two webhook IDs do not match or the automation is disabled. HTTP `405` means POST is not enabled in the webhook trigger.

Treat the webhook ID like a password and keep `local_only` enabled. Anyone who knows the ID and can reach the endpoint can trigger this reload automation.

### Integration install

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
URL: /wand_remote/wand-remote-card.js?v=0.11.1
Resource type: JavaScript module
```

Then hard refresh the browser and reopen the card picker. You can also test whether the file is being served by opening:

```text
http://YOUR_HA_ADDRESS:8123/wand_remote/wand-remote-card.js?v=0.11.1
```

If that URL returns 404, the integration has not been added in **Devices & services** or Home Assistant has not restarted after installation.

### HACS frontend install

If you want the card to appear from HACS as a frontend card, add this repository to HACS as type **Dashboard** or **Frontend** instead of Integration.

Use this resource URL:

```text
/hacsfiles/wand/wand.js
```

If your HACS folder name differs, use the URL shown by HACS for the downloaded frontend plugin. The `wand.js` file exists at the repo root and under `dist/` for HACS plugin validation.

### Why `/wand_remote/...` can 404

The `/wand_remote/wand-remote-card.js` route is created by the backend integration at runtime. It does not exist just because HACS downloaded files. It exists only after:

- the files are under `/config/custom_components/wand_remote`
- Home Assistant has restarted
- **Wand Universal Remote** has been added in **Settings -> Devices & services**

For pure frontend/HACS card usage, use `/hacsfiles/wand/wand.js` instead.

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
