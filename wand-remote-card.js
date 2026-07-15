const VERSION = "0.10.4";

const DEFAULT_REMOTE_ROWS = [
  ["back", "power", "home", "menu"],
  ["touchpad", ["volume_buttons"]],
  ["rewind", "previous", "play_pause", "next", "fast_forward"]
];

const DEFAULT_CONFIG = {
  title: "Universal Remote",
  theme: "midnight",
  layout: "tabs",
  show_power_bar: true,
  show_refresh_button: true,
  show_entity_status: true,
  show_media_preview: true,
  show_now_controlling: true,
  show_unavailable_devices: true,
  persist_navigation: true,
  use_universal_remote_card: true,
  universal_remote_card_type: "custom:universal-remote-card",
  rooms: [
    {
      id: "master_bedroom",
      name: "Master Bedroom",
      icon: "mdi:bed-king",
      accent: "#a78bfa",
      source_entity_id: "",
      show_power_button: true,
      show_refresh_button: true,
      power_on_action: null,
      power_off_action: null,
      refresh_action: null,
      devices: [
        {
          id: "apple_tv",
          name: "Apple TV",
          icon: "mdi:apple",
          accent: "#f8fafc",
          platform: "Apple TV",
          remote_id: "remote.bedroom",
          media_player_id: "media_player.bedroom",
          power_entity: "media_player.bedroom",
          source_entity_id: "",
          source_name: "Apple TV",
          home_on_select: true,
          home_command: "auto",
          select_delay_ms: 900,
          switch_action: null,
          power_on_action: null,
          power_off_action: null,
          refresh_action: null,
          card_config: {
            type: "custom:universal-remote-card",
            remote_id: "remote.bedroom",
            media_player_id: "media_player.bedroom",
            platform: "Apple TV",
            custom_actions: [],
            rows: DEFAULT_REMOTE_ROWS
          }
        }
      ]
    }
  ]
};

const FALLBACK_ACTIONS = {
  back: { icon: "mdi:arrow-left", label: "Back", command: "back" },
  power: { icon: "mdi:power", label: "Power", command: "power" },
  wakeup: { icon: "mdi:power-on", label: "Wake up", command: "wakeup" },
  suspend: { icon: "mdi:power-sleep", label: "Suspend", command: "suspend" },
  home: { icon: "mdi:home", label: "Home", command: "home" },
  menu: { icon: "mdi:menu", label: "Menu", command: "menu" },
  top_menu: { icon: "mdi:apple", label: "Top menu", command: "top_menu" },
  up: { icon: "mdi:chevron-up", label: "Up", command: "up" },
  down: { icon: "mdi:chevron-down", label: "Down", command: "down" },
  left: { icon: "mdi:chevron-left", label: "Left", command: "left" },
  right: { icon: "mdi:chevron-right", label: "Right", command: "right" },
  select: { icon: "mdi:circle-slice-8", label: "Select", command: "select" },
  play_pause: { icon: "mdi:play-pause", label: "Play", media: "media_play_pause" },
  rewind: { icon: "mdi:rewind", label: "Rewind", command: "rewind" },
  previous: { icon: "mdi:skip-previous", label: "Previous", command: "previous" },
  next: { icon: "mdi:skip-next", label: "Next", command: "next" },
  fast_forward: { icon: "mdi:fast-forward", label: "Forward", command: "fast_forward" },
  volume_up: { icon: "mdi:volume-plus", label: "Volume up", media: "volume_up" },
  volume_down: { icon: "mdi:volume-minus", label: "Volume down", media: "volume_down" },
  volume_mute: { icon: "mdi:volume-mute", label: "Mute", media: "volume_mute" },
  mute: { icon: "mdi:volume-mute", label: "Mute", media: "volume_mute" },
  slider: { icon: "mdi:tune-variant", label: "Volume slider", command: "slider" },
  channel_up: { icon: "mdi:chevron-double-up", label: "Channel up", command: "channel_up" },
  channel_down: { icon: "mdi:chevron-double-down", label: "Channel down", command: "channel_down" },
  n0: { text: "0", label: "0", command: "0" },
  n1: { text: "1", label: "1", command: "1" },
  n2: { text: "2", label: "2", command: "2" },
  n3: { text: "3", label: "3", command: "3" },
  n4: { text: "4", label: "4", command: "4" },
  n5: { text: "5", label: "5", command: "5" },
  n6: { text: "6", label: "6", command: "6" },
  n7: { text: "7", label: "7", command: "7" },
  n8: { text: "8", label: "8", command: "8" },
  n9: { text: "9", label: "9", command: "9" }
};

const THEMES = {
  midnight: {
    surface: "rgba(12, 14, 18, .96)",
    panel: "rgba(255,255,255,.055)",
    panelStrong: "rgba(255,255,255,.105)",
    text: "rgba(255,255,255,.96)",
    muted: "rgba(255,255,255,.62)",
    border: "rgba(255,255,255,.12)",
    shadow: "rgba(0,0,0,.42)"
  },
  glass: {
    surface: "rgba(25, 30, 39, .82)",
    panel: "rgba(255,255,255,.08)",
    panelStrong: "rgba(255,255,255,.14)",
    text: "rgba(255,255,255,.97)",
    muted: "rgba(255,255,255,.68)",
    border: "rgba(255,255,255,.17)",
    shadow: "rgba(0,0,0,.34)"
  },
  quiet: {
    surface: "rgba(248, 250, 252, .98)",
    panel: "rgba(15,23,42,.055)",
    panelStrong: "rgba(15,23,42,.10)",
    text: "rgba(15,23,42,.94)",
    muted: "rgba(15,23,42,.62)",
    border: "rgba(15,23,42,.13)",
    shadow: "rgba(15,23,42,.12)"
  },
  high_contrast: {
    surface: "rgba(0,0,0,.98)",
    panel: "rgba(255,255,255,.12)",
    panelStrong: "rgba(255,255,255,.2)",
    text: "#fff",
    muted: "rgba(255,255,255,.76)",
    border: "rgba(255,255,255,.30)",
    shadow: "rgba(0,0,0,.62)"
  }
};

const ON_STATES = new Set(["on", "playing", "paused", "idle", "standby", "buffering"]);
const OFF_STATES = new Set(["off", "unavailable", "unknown"]);

const clone = (value) => JSON.parse(JSON.stringify(value));
const slug = (value) => String(value || "item").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "item";
const isObject = (value) => value && typeof value === "object" && !Array.isArray(value);

class WandRemoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = clone(DEFAULT_CONFIG);
    this._selectedRoom = null;
    this._selectedDevice = null;
    this._helpers = null;
    this._embeddedCard = null;
    this._embeddedSignature = "";
    this._restoredSelection = false;
    this._hasRendered = false;
    this._stateFrame = 0;
    this._focusMode = false;
    this._actionLocks = new Set();
    this._renderToken = 0;
    this._onKeyDown = (event) => {
      if (event.key === "Escape" && this._focusMode) this._toggleFocusMode(false);
    };
  }

  connectedCallback() {
    window.addEventListener("keydown", this._onKeyDown);
  }

  disconnectedCallback() {
    window.removeEventListener("keydown", this._onKeyDown);
    if (this._stateFrame) cancelAnimationFrame(this._stateFrame);
  }

  static getStubConfig() {
    return clone(DEFAULT_CONFIG);
  }

  static getConfigElement() {
    return document.createElement("wand-remote-card-editor");
  }

  setConfig(config) {
    this._config = this._normalizeConfig(config);
    this._restoreSelection();
    const preview = this._config.editor_preview_selection;
    if (preview?.nonce && preview.nonce !== this._previewSelectionNonce) {
      this._previewSelectionNonce = preview.nonce;
      this._selectedRoom = preview.room_id || this._selectedRoom;
      this._selectedDevice = preview.device_id || this._selectedDevice;
    }
    if (this._selectedRoom && !this._config.rooms?.some((room) => room.id === this._selectedRoom)) {
      this._selectedRoom = null;
      this._selectedDevice = null;
    }
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._embeddedCard) this._embeddedCard.hass = hass;
    if (!this._hasRendered) this._render();
    else this._scheduleStateRefresh();
  }

  getCardSize() {
    return 9;
  }

  _normalizeConfig(config) {
    const merged = { ...clone(DEFAULT_CONFIG), ...clone(config || {}) };
    merged.rooms = (merged.rooms || []).map((room) => ({
      id: room.id || slug(room.name),
      name: room.name || "Room",
      icon: room.icon || "mdi:sofa",
      accent: room.accent || "#38bdf8",
      source_entity_id: room.source_entity_id || "",
      show_power_button: room.show_power_button ?? true,
      show_refresh_button: room.show_refresh_button ?? true,
      power_on_action: room.power_on_action || null,
      power_off_action: room.power_off_action || null,
      refresh_action: room.refresh_action || null,
      devices: (room.devices || []).map((device) => this._normalizeDevice(device, merged))
    }));
    return merged;
  }

  _normalizeDevice(device, rootConfig = this._config) {
    const cardConfig = {
      type: rootConfig.universal_remote_card_type || "custom:universal-remote-card",
      remote_id: device.remote_id || undefined,
      media_player_id: device.media_player_id || undefined,
      platform: device.platform || undefined,
      custom_actions: device.custom_actions || [],
      rows: device.rows || DEFAULT_REMOTE_ROWS,
      ...(device.card_config || {})
    };

    return {
      id: device.id || slug(device.name),
      name: device.name || "Device",
      icon: device.icon || "mdi:remote",
      accent: device.accent || "#38bdf8",
      platform: device.platform || cardConfig.platform || "",
      remote_id: device.remote_id || cardConfig.remote_id || "",
      media_player_id: device.media_player_id || cardConfig.media_player_id || "",
      power_entity: device.power_entity || device.media_player_id || cardConfig.media_player_id || device.remote_id || "",
      source_entity_id: device.source_entity_id || "",
      source_name: this._cleanSourceName(device.source_name) || device.name || cardConfig.platform || "",
      auto_select_source: device.auto_select_source ?? true,
      home_on_select: device.home_on_select ?? true,
      home_command: device.home_command || "auto",
      select_delay_ms: Number(device.select_delay_ms ?? 900),
      availability_entities: device.availability_entities || [],
      switch_action: device.switch_action || null,
      power_on_action: device.power_on_action || null,
      power_off_action: device.power_off_action || null,
      refresh_action: device.refresh_action || null,
      hidden_when_off: Boolean(device.hidden_when_off),
      use_universal_remote_card: device.use_universal_remote_card ?? rootConfig.use_universal_remote_card,
      card_config: cardConfig,
      actions: device.actions || []
    };
  }

  _currentRoom() {
    if (!this._selectedRoom) return null;
    return (this._config.rooms || []).find((room) => room.id === this._selectedRoom) || null;
  }

  _visibleDevices(room) {
    const devices = room?.devices || [];
    if (this._config.show_unavailable_devices) return devices;
    return devices.filter((device) => !this._isUnavailable(device));
  }

  _currentDevice() {
    const room = this._currentRoom();
    const devices = this._visibleDevices(room);
    return devices.find((device) => device.id === this._selectedDevice) || devices[0] || room?.devices?.[0];
  }

  _entityState(entityId) {
    return entityId && this._hass?.states?.[entityId] ? this._hass.states[entityId].state : undefined;
  }

  _entityAttributes(entityId) {
    return entityId && this._hass?.states?.[entityId] ? this._hass.states[entityId].attributes || {} : {};
  }

  _roomSourceEntity(room) {
    return room?.source_entity_id || room?.devices?.find((device) => device.source_entity_id)?.source_entity_id || room?.devices?.find((device) => device.media_player_id)?.media_player_id || "";
  }

  _currentSource(room) {
    const entityId = this._roomSourceEntity(room);
    return this._entityAttributes(entityId).source || this._entityAttributes(entityId).app_name || "";
  }

  _sourceEntityForDevice(device, room = this._currentRoom()) {
    return device?.source_entity_id || room?.source_entity_id || "";
  }

  _cleanSourceName(sourceName) {
    const value = String(sourceName || "").trim();
    return ["", "new device"].includes(value.toLowerCase()) ? "" : value;
  }

  _desiredSourceName(device) {
    return this._cleanSourceName(device?.source_name) || device?.name || device?.platform || "";
  }

  _normalizeSource(value) {
    return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  }

  _mediaPreview(device) {
    const attrs = this._entityAttributes(device?.media_player_id) || {};
    const roomAttrs = this._entityAttributes(this._roomSourceEntity(this._currentRoom())) || {};
    const picture = attrs.entity_picture || roomAttrs.entity_picture || "";
    const title = attrs.media_title || attrs.app_name || roomAttrs.media_title || roomAttrs.app_name || "";
    return { picture: this._mediaUrl(picture), title };
  }

  _mediaUrl(path) {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    return typeof this._hass?.hassUrl === "function" ? this._hass.hassUrl(path) : path;
  }

  _sourceMatches(device, room = this._currentRoom()) {
    const entityId = this._sourceEntityForDevice(device, room);
    if (!entityId) return false;
    const current = this._entityAttributes(entityId).source || this._entityAttributes(entityId).app_name || "";
    const expected = this._desiredSourceName(device);
    return Boolean(current && expected && this._normalizeSource(current) === this._normalizeSource(expected));
  }

  _sourceSupported(entityId, sourceName) {
    const sources = this._entityAttributes(entityId).source_list;
    if (!Array.isArray(sources) || !sources.length) return false;
    return Boolean(this._resolveSourceName(entityId, sourceName));
  }

  _resolveSourceName(entityId, sourceName) {
    const sources = this._entityAttributes(entityId).source_list;
    if (!Array.isArray(sources) || !sources.length) return "";
    const wanted = this._normalizeSource(sourceName);
    return sources.find((source) => this._normalizeSource(source) === wanted) || "";
  }

  _isUnavailable(device) {
    const entities = [device.power_entity, device.remote_id, device.media_player_id, ...(device.availability_entities || [])].filter(Boolean);
    return entities.length > 0 && entities.every((entityId) => ["unavailable", "unknown"].includes(this._entityState(entityId)));
  }

  _isOn(device) {
    const state = this._entityState(device.power_entity) || this._entityState(device.media_player_id) || this._entityState(device.remote_id);
    if (!state) return false;
    if (ON_STATES.has(state)) return true;
    if (OFF_STATES.has(state)) return false;
    return !["off", "unavailable", "unknown"].includes(state);
  }

  _roomPowerState(room) {
    const devices = room?.devices || [];
    if (!devices.length) return "empty";
    if (devices.some((device) => this._isUnavailable(device))) return "issue";
    return devices.some((device) => this._isOn(device)) ? "on" : "off";
  }

  _render() {
    if (!this.shadowRoot) return;
    const renderToken = ++this._renderToken;
    const room = this._currentRoom();
    const device = this._currentDevice();
    const theme = THEMES[this._config.theme] || THEMES.midnight;
    const accent = device?.accent || room?.accent || "#38bdf8";
    const roomPower = this._roomPowerState(room);
    const isLanding = !room;
    const source = this._currentSource(room);

    this.shadowRoot.innerHTML = `
      <style>${this._styles(theme, accent)}</style>
      <ha-card class="wrap ${isLanding ? "landing-wrap" : "control-wrap"}${!isLanding && this._focusMode ? " focus-mode" : ""}">
        ${isLanding ? this._landingPage() : `
          <header class="control-header">
            <button class="back" data-back title="Areas"><ha-icon icon="mdi:chevron-left"></ha-icon></button>
            <div class="title">
              <p>${this._escape(this._config.title || "Universal Remote")}</p>
              <h2>${this._escape(room.name)}</h2>
              ${source ? `<small class="source-line">Source: ${this._escape(source)}</small>` : ""}
            </div>
            <div class="header-actions">
              ${this._config.show_entity_status ? `<span class="badge ${roomPower}">${this._escape(roomPower)}</span>` : ""}
              <button class="focus-remote" data-focus-remote title="${this._focusMode ? "Exit expanded remote" : "Expand remote"}" aria-label="${this._focusMode ? "Exit expanded remote" : "Expand remote"}"><ha-icon icon="mdi:${this._focusMode ? "arrow-collapse" : "arrow-expand"}"></ha-icon></button>
              ${this._config.show_refresh_button && room.show_refresh_button !== false ? `<button class="refresh-room" data-room-refresh title="Refresh entity states" aria-label="Refresh entity states"><ha-icon icon="mdi:refresh"></ha-icon></button>` : ""}
              ${this._config.show_power_bar && room.show_power_button !== false ? `<button class="power-room ${roomPower}" data-room-power title="Room power"><ha-icon icon="mdi:power"></ha-icon></button>` : ""}
            </div>
          </header>

          <section class="device-strip">${this._visibleDevices(room).map((item) => this._deviceButton(item)).join("")}</section>
          ${device && this._config.show_now_controlling ? this._deviceHeader(device) : device ? "" : `<div class="empty-message">Add a device for ${this._escape(room.name)} in the visual editor.</div>`}
          <section id="remote-host" class="remote-host">${device ? this._fallbackRemote(device) : ""}</section>
        `}
      </ha-card>
    `;

    this.shadowRoot.querySelectorAll("[data-room]").forEach((button) => {
      button.addEventListener("click", () => {
        this._selectedRoom = button.dataset.room;
        this._selectedDevice = this._visibleDevices(this._currentRoom())?.[0]?.id;
        this._embeddedCard = null;
        this._rememberSelection();
        this._render();
      });
    });

    this.shadowRoot.querySelector("[data-back]")?.addEventListener("click", () => {
      this._selectedRoom = null;
      this._selectedDevice = null;
      this._embeddedCard = null;
      this._focusMode = false;
      this._rememberSelection();
      this._render();
    });

    this.shadowRoot.querySelectorAll("[data-device]").forEach((button) => {
      button.addEventListener("click", () => {
        this._selectedDevice = button.dataset.device;
        this._embeddedCard = null;
        this._rememberSelection();
        const selectedDevice = this._currentDevice();
        this._render();
        this._runUiAction(`select:${selectedDevice?.id}`, () => this._selectDevice(selectedDevice, room));
      });
    });

    this.shadowRoot.querySelector("[data-focus-remote]")?.addEventListener("click", () => this._toggleFocusMode());
    this.shadowRoot.querySelector("[data-room-power]")?.addEventListener("click", (event) => this._runUiAction("room-power", () => this._toggleRoomPower(room), event.currentTarget));
    this.shadowRoot.querySelector("[data-room-refresh]")?.addEventListener("click", (event) => this._runUiAction("refresh", () => this._refreshRoom(room, device), event.currentTarget));
    this.shadowRoot.querySelector("[data-device-power]")?.addEventListener("click", (event) => this._runUiAction(`device-power:${device?.id}`, () => this._toggleDevicePower(device), event.currentTarget));
    this.shadowRoot.querySelectorAll("[data-fallback-action]").forEach((button) => {
      button.addEventListener("click", () => this._runUiAction(`action:${device?.id}:${button.dataset.fallbackAction}`, () => this._callFallbackAction(device, button.dataset.fallbackAction), button));
    });

    this._hasRendered = true;
    if (!isLanding) this._renderEmbeddedRemote(device, renderToken);
  }

  _scheduleStateRefresh() {
    if (this._stateFrame) return;
    this._stateFrame = requestAnimationFrame(() => {
      this._stateFrame = 0;
      this._refreshDynamicState();
    });
  }

  _refreshDynamicState() {
    const room = this._currentRoom();
    if (!room) {
      this.shadowRoot.querySelectorAll("[data-room]").forEach((button) => {
        const item = this._config.rooms.find((candidate) => candidate.id === button.dataset.room);
        if (!item) return;
        const active = (item.devices || []).filter((device) => this._isOn(device)).length;
        const count = item.devices?.length || 0;
        const status = button.querySelector("i");
        const summary = button.querySelector("small");
        if (status) status.className = this._roomPowerState(item);
        if (summary) summary.textContent = `${count} device${count === 1 ? "" : "s"} \u00b7 ${active} active`;
      });
      return;
    }

    const roomPower = this._roomPowerState(room);
    const visibleIds = this._visibleDevices(room).map((item) => item.id).join("\n");
    const renderedIds = [...this.shadowRoot.querySelectorAll("[data-device]")]
      .map((button) => button.dataset.device)
      .join("\n");
    if (visibleIds !== renderedIds) {
      this._render();
      return;
    }

    const badge = this.shadowRoot.querySelector(".badge");
    if (badge) {
      badge.className = `badge ${roomPower}`;
      badge.textContent = roomPower;
    }
    const roomPowerButton = this.shadowRoot.querySelector("[data-room-power]");
    if (roomPowerButton) roomPowerButton.className = `power-room ${roomPower}`;
    const source = this._currentSource(room);
    const sourceLine = this.shadowRoot.querySelector(".source-line");
    if (Boolean(source) !== Boolean(sourceLine)) {
      this._render();
      return;
    }
    if (sourceLine) sourceLine.textContent = `Source: ${source}`;

    this.shadowRoot.querySelectorAll("[data-device]").forEach((button) => {
      const item = room.devices.find((candidate) => candidate.id === button.dataset.device);
      if (!item) return;
      button.classList.toggle("selected", item.id === this._currentDevice()?.id);
      button.classList.toggle("source-active", this._sourceMatches(item, room));
      const status = button.querySelector("i");
      if (status) status.className = this._isUnavailable(item) ? "issue" : this._isOn(item) ? "on" : "off";
    });

    const device = this._currentDevice();
    const devicePower = this.shadowRoot.querySelector("[data-device-power]");
    if (devicePower) devicePower.className = `power-device ${this._isUnavailable(device) ? "unavailable" : this._isOn(device) ? "on" : "off"}`;
  }

  _toggleFocusMode(force) {
    this._focusMode = typeof force === "boolean" ? force : !this._focusMode;
    const wrap = this.shadowRoot?.querySelector(".wrap");
    const button = this.shadowRoot?.querySelector("[data-focus-remote]");
    wrap?.classList.toggle("focus-mode", this._focusMode);
    if (button) {
      const label = this._focusMode ? "Exit expanded remote" : "Expand remote";
      button.title = label;
      button.setAttribute("aria-label", label);
      button.querySelector("ha-icon")?.setAttribute("icon", `mdi:${this._focusMode ? "arrow-collapse" : "arrow-expand"}`);
    }
  }

  async _runUiAction(key, operation, button) {
    if (this._actionLocks.has(key)) return;
    this._actionLocks.add(key);
    if (button) {
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
    }
    try {
      await operation();
      this._scheduleStateRefresh();
      if (key === "refresh" && button?.isConnected) {
        const icon = button.querySelector("ha-icon");
        icon?.setAttribute("icon", "mdi:check");
        button.classList.add("action-success");
        window.setTimeout(() => {
          if (!button.isConnected) return;
          icon?.setAttribute("icon", "mdi:refresh");
          button.classList.remove("action-success");
        }, 1600);
      }
    } catch (err) {
      console.warn(`Wand action failed (${key})`, err);
      const reason = String(err?.message || err?.body?.message || "Unknown Home Assistant error").slice(0, 180);
      this.dispatchEvent(new CustomEvent("hass-notification", {
        detail: { message: key === "refresh" ? `Remote refresh failed: ${reason}` : `Wand action failed: ${reason}` },
        bubbles: true,
        composed: true
      }));
    } finally {
      this._actionLocks.delete(key);
      if (button?.isConnected) {
        button.disabled = false;
        button.removeAttribute("aria-busy");
      }
    }
  }

  _landingPage() {
    return `
      <header class="landing-header">
        <div class="title">
          <p>${this._escape(this._config.title || "Universal Remote")}</p>
          <h2>Choose Area</h2>
        </div>
      </header>
      <section class="area-grid">
        ${(this._config.rooms || []).map((room) => this._areaCard(room)).join("")}
      </section>
    `;
  }

  _storageKey() {
    const path = window.location?.pathname || "dashboard";
    return `wand-remote-card:${path}:${this._config.title || "remote"}:selection`;
  }

  _restoreSelection() {
    if (this._restoredSelection || !this._config.persist_navigation) return;
    this._restoredSelection = true;
    try {
      const saved = JSON.parse(localStorage.getItem(this._storageKey()) || "{}");
      if (saved.room && this._config.rooms?.some((room) => room.id === saved.room)) {
        this._selectedRoom = saved.room;
        const room = this._config.rooms.find((item) => item.id === saved.room);
        this._selectedDevice = room?.devices?.some((device) => device.id === saved.device)
          ? saved.device
          : room?.devices?.[0]?.id;
      }
    } catch (err) {
      this._selectedRoom = null;
      this._selectedDevice = null;
    }
  }

  _rememberSelection() {
    if (!this._config.persist_navigation) return;
    try {
      localStorage.setItem(this._storageKey(), JSON.stringify({ room: this._selectedRoom, device: this._selectedDevice }));
    } catch (err) {
      // Ignore storage failures; navigation still works for the current session.
    }
  }

  _areaCard(room) {
    const state = this._roomPowerState(room);
    const devices = room.devices?.length || 0;
    const active = (room.devices || []).filter((device) => this._isOn(device)).length;
    return `
      <button class="area-card" data-room="${this._escape(room.id)}" style="--item-accent:${this._escape(room.accent)}">
        <span class="area-icon"><ha-icon icon="${this._escape(room.icon)}"></ha-icon></span>
        <span class="area-copy">
          <strong>${this._escape(room.name)}</strong>
          <small>${devices} device${devices === 1 ? "" : "s"} · ${active} active</small>
        </span>
        <i class="${state}"></i>
      </button>
    `;
  }

  _roomButton(room) {
    const selected = room.id === this._currentRoom()?.id ? " selected" : "";
    const state = this._roomPowerState(room);
    return `
      <button class="room${selected}" data-room="${this._escape(room.id)}" style="--item-accent:${this._escape(room.accent)}">
        <ha-icon icon="${this._escape(room.icon)}"></ha-icon>
        <span>${this._escape(room.name)}</span>
        <i class="${state}"></i>
      </button>
    `;
  }

  _deviceButton(device) {
    const selected = device.id === this._currentDevice()?.id ? " selected" : "";
    const state = this._isUnavailable(device) ? "issue" : this._isOn(device) ? "on" : "off";
    const sourceActive = this._sourceMatches(device) ? " source-active" : "";
    return `
      <button class="device${selected}${sourceActive}" data-device="${this._escape(device.id)}" style="--item-accent:${this._escape(device.accent)}">
        <ha-icon icon="${this._escape(device.icon)}"></ha-icon>
        <span>${this._escape(device.name)}</span>
        <i class="${state}"></i>
      </button>
    `;
  }

  _deviceHeader(device) {
    const state = this._isUnavailable(device) ? "Unavailable" : this._isOn(device) ? "On" : "Off";
    const source = this._currentSource(this._currentRoom());
    const isSourceActive = this._sourceMatches(device);
    const preview = this._config.show_media_preview ? this._mediaPreview(device) : {};
    const chips = [
      isSourceActive ? `<span class="active">Active source</span>` : "",
      preview.title ? `<span>${this._escape(preview.title)}</span>` : "",
      source ? `<span>${this._escape(source)}</span>` : ""
    ].filter(Boolean).join("");
    return `
      <section class="device-header" style="--device-accent:${this._escape(device.accent)}">
        <div class="control-copy">
          <p>Now controlling</p>
          <h3>${this._escape(device.name)}</h3>
          ${chips ? `<div class="control-chips">${chips}</div>` : ""}
        </div>
        ${preview.picture ? `<img class="media-preview" src="${this._escape(preview.picture)}" alt="">` : ""}
        <button class="power-device ${state.toLowerCase()}" data-device-power title="Device power">
          <ha-icon icon="mdi:power"></ha-icon>
        </button>
      </section>
    `;
  }

  async _renderEmbeddedRemote(device, renderToken = this._renderToken) {
    const host = this.shadowRoot?.getElementById("remote-host");
    if (!host || !device || !device.use_universal_remote_card) return;

    const cardConfig = this._remoteCardConfig(device);
    const signature = JSON.stringify(cardConfig);
    if (this._embeddedCard && this._embeddedSignature === signature) {
      host.replaceChildren(this._embeddedCard);
      this._embeddedCard.hass = this._hass;
      return;
    }

    try {
      this._helpers = this._helpers || await window.loadCardHelpers();
      if (renderToken !== this._renderToken || !host.isConnected) return;
      const card = this._helpers.createCardElement(cardConfig);
      card.hass = this._hass;
      this._embeddedCard = card;
      this._embeddedSignature = signature;
      host.replaceChildren(card);
      host.classList.add("embedded");
    } catch (err) {
      host.classList.remove("embedded");
      host.dataset.error = "Universal remote card is not loaded. Showing fallback controls.";
    }
  }

  _remoteCardConfig(device) {
    const config = clone(device.card_config || {});
    config.type = config.type || this._config.universal_remote_card_type || "custom:universal-remote-card";
    if (device.remote_id && !config.remote_id) config.remote_id = device.remote_id;
    if (device.media_player_id && !config.media_player_id) config.media_player_id = device.media_player_id;
    if (device.platform && !config.platform) config.platform = device.platform;
    if (!config.rows) config.rows = DEFAULT_REMOTE_ROWS;
    if (!config.custom_actions) config.custom_actions = [];
    return config;
  }

  _fallbackRemote(device) {
    if (device.use_universal_remote_card) {
      return `<div class="fallback-note">Loading universal remote controls...</div>${this._manualButtons(device)}`;
    }
    return this._manualButtons(device);
  }

  _manualButtons(device) {
    const rows = device.card_config?.rows || device.rows || DEFAULT_REMOTE_ROWS;
    return `
      <div class="manual-remote">
        ${rows.map((row) => `<div class="row">${row.flat().map((action) => this._fallbackButton(action)).join("")}</div>`).join("")}
        <div class="row">${["volume_down", "volume_mute", "volume_up"].map((action) => this._fallbackButton(action)).join("")}</div>
      </div>
    `;
  }

  _fallbackButton(actionKey) {
    if (actionKey === "touchpad") return `<button class="wide touchpad" data-fallback-action="select"><ha-icon icon="mdi:gesture-tap"></ha-icon><span>Tap to select</span></button>`;
    if (actionKey === "volume_buttons") return "";
    const action = FALLBACK_ACTIONS[actionKey] || { icon: "mdi:gesture-tap-button", label: actionKey, command: actionKey };
    const body = action.text ? `<span>${this._escape(action.text)}</span>` : `<ha-icon icon="${this._escape(action.icon)}"></ha-icon>`;
    return `<button class="action" title="${this._escape(action.label)}" data-fallback-action="${this._escape(actionKey)}">${body}</button>`;
  }

  async _toggleRoomPower(room) {
    if (!room) return;
    const shouldTurnOff = (room.devices || []).some((device) => this._isOn(device));
    const roomAction = shouldTurnOff ? room.power_off_action : room.power_on_action;
    if (roomAction) {
      await this._runAction(roomAction);
      return;
    }
    await Promise.all((room.devices || []).map((device) => this._setDevicePower(device, shouldTurnOff ? "off" : "on")));
  }

  async _toggleDevicePower(device) {
    if (!device) return;
    await this._setDevicePower(device, this._isOn(device) ? "off" : "on");
  }

  async _refreshRoom(room, device = this._currentDevice()) {
    if (!room || !this._hass) return;
    if (room.refresh_action) {
      await this._runAction(room.refresh_action);
      return;
    }
    if (device?.refresh_action) {
      await this._runAction(device.refresh_action);
      return;
    }

    const entities = [...new Set((room.devices || [])
      .flatMap((item) => [item.remote_id, item.media_player_id, item.power_entity, item.source_entity_id, ...(item.availability_entities || [])])
      .filter(Boolean))];
    if (!entities.length) return;

    // The integration service filters by the caller's entity permissions. Keep the
    // core fallback for users who install the card as a frontend-only HACS resource.
    if (this._hass.services?.wand_remote?.refresh_entities) {
      // Avoid the reserved entity_id field: Home Assistant authorizes target
      // fields before the Wand handler can apply its scoped read check.
      await this._hass.callService("wand_remote", "refresh_entities", { entities });
    } else if (this._hass.user?.is_admin) {
      await this._hass.callService("homeassistant", "reload_config_entry", {}, { entity_id: entities });
    } else {
      throw new Error("Wand backend refresh service is unavailable");
    }
    if (this._embeddedCard) this._embeddedCard.hass = this._hass;
    this._refreshDynamicState();
    this.dispatchEvent(new CustomEvent("hass-notification", {
      detail: { message: "Remote integrations refreshed." },
      bubbles: true,
      composed: true
    }));
  }

  async _selectDevice(device, room) {
    if (!device) return;
    let switched = false;
    if (device.switch_action) {
      await this._runAction(device.switch_action);
      switched = true;
    }

    if (device.auto_select_source) {
      const sourceEntity = this._sourceEntityForDevice(device, room);
      const sourceName = this._desiredSourceName(device);
      const resolvedSource = sourceEntity && sourceName ? this._resolveSourceName(sourceEntity, sourceName) : "";
      if (sourceEntity && resolvedSource) {
        await this._hass?.callService("media_player", "select_source", {
          entity_id: sourceEntity,
          source: resolvedSource
        });
        switched = true;
      }
    }

    if (switched && device.select_delay_ms > 0) await this._sleep(device.select_delay_ms);
    if (device.home_on_select) await this._sendDeviceHome(device);
  }

  _sleep(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  async _sendDeviceHome(device) {
    if (!this._hass || !device) return;
    const commands = this._homeCommandsForDevice(device);
    if (device.remote_id && commands.length) {
      for (const command of commands) {
        try {
          await this._hass.callService("remote", "send_command", { entity_id: device.remote_id, command });
          return;
        } catch (err) {
          // Try the next platform-specific key name. Some integrations reject generic "home".
        }
      }
      return;
    }
    if (device.media_player_id) {
      await this._hass.callService("homeassistant", "turn_on", { entity_id: device.media_player_id });
    }
  }

  _homeCommandsForDevice(device) {
    const custom = String(device.home_command || "auto").trim();
    if (custom && !["auto", "home"].includes(custom.toLowerCase())) return [custom];

    const platform = String(device.platform || device.name || "").toLowerCase();
    const candidates = [];
    if (platform.includes("tata")) return [];
    if (platform.includes("samsung")) candidates.push("KEY_HOME");
    else if (platform.includes("google") || platform.includes("android") || platform.includes("fire")) candidates.push("HOME");
    else if (platform.includes("apple")) candidates.push("home", "HOME");
    else if (platform.includes("roku")) candidates.push("home", "HOME");
    else candidates.push("home", "HOME", "KEY_HOME");
    return [...new Set(candidates.filter(Boolean))];
  }

  async _setDevicePower(device, mode) {
    const custom = mode === "on" ? device.power_on_action : device.power_off_action;
    if (custom) {
      await this._runAction(custom);
      return;
    }

    const target = device.power_entity || device.media_player_id || device.remote_id;
    if (!target) return;
    await this._hass?.callService("homeassistant", mode === "on" ? "turn_on" : "turn_off", { entity_id: target });
  }

  async _runAction(action) {
    if (!this._hass || !action) return;
    const normalized = typeof action === "string" ? { service: action } : action;
    if (!normalized.service) return;
    const [domain, service] = normalized.service.split(".");
    if (!domain || !service) return;
    await this._hass.callService(domain, service, normalized.service_data || {}, normalized.target);
  }

  async _callFallbackAction(device, actionKey) {
    if (!this._hass || !device) return;
    const custom = (device.actions || []).find((action) => action.id === actionKey || action.name === actionKey);
    if (custom) {
      await this._runAction(custom);
      return;
    }

    const action = FALLBACK_ACTIONS[actionKey] || { command: actionKey };
    if (action.media && device.media_player_id) {
      await this._hass.callService("media_player", action.media, { entity_id: device.media_player_id });
      return;
    }
    if (device.remote_id && action.command) {
      await this._hass.callService("remote", "send_command", { entity_id: device.remote_id, command: action.command });
    }
  }

  _styles(theme, accent) {
    return `
      :host { display:block; --accent:${accent}; }
      * { box-sizing:border-box; letter-spacing:0; }
      .wrap {
        overflow:hidden; padding:18px; border-radius:24px; color:${theme.text}; contain:layout paint;
        background:linear-gradient(160deg, ${theme.surface}, ${theme.surface}), radial-gradient(circle at 50% -10%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 44%);
        border:1px solid ${theme.border}; box-shadow:0 22px 62px ${theme.shadow};
      }
      header, .header-actions, .device-header { display:flex; align-items:center; gap:12px; }
      header { justify-content:space-between; margin-bottom:16px; }
      .landing-wrap { min-height:260px; }
      .landing-header { margin-bottom:18px; }
      .control-header { display:grid; grid-template-columns:auto 1fr auto; }
      .title { min-width:0; }
      .source-line { display:block; margin-top:5px; color:${theme.muted}; font-size:12px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      p { margin:0 0 4px; color:${theme.muted}; font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1.8px; }
      h2, h3 { margin:0; line-height:1.1; letter-spacing:0; }
      h2 { font-size:24px; }
      h3 { font-size:20px; }
      small { display:block; margin-top:5px; color:${theme.muted}; font-size:12px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      button { font:inherit; color:inherit; border:0; cursor:pointer; -webkit-tap-highlight-color:transparent; }
      .back {
        width:42px; height:42px; border-radius:50%; display:grid; place-items:center; background:${theme.panel}; border:1px solid ${theme.border};
        transition:transform .16s ease, background .16s ease;
      }
      .badge { padding:7px 10px; border-radius:999px; border:1px solid ${theme.border}; background:${theme.panel}; color:${theme.muted}; font-size:11px; font-weight:800; text-transform:uppercase; }
      .badge.on, .badge.issue { color:${theme.text}; border-color:color-mix(in srgb, var(--accent) 45%, ${theme.border}); }
      .power-room, .power-device, .refresh-room, .focus-remote {
        width:42px; height:42px; display:grid; place-items:center; border-radius:50%; background:${theme.panel}; border:1px solid ${theme.border};
        transition:transform .16s ease, background .16s ease, border-color .16s ease;
      }
      .power-room.on, .power-device.on { background:color-mix(in srgb, var(--accent) 24%, ${theme.panelStrong}); border-color:color-mix(in srgb, var(--accent) 62%, ${theme.border}); }
      .refresh-room.action-success { color:#22c55e; border-color:rgba(34,197,94,.55); background:rgba(34,197,94,.14); }
      .area-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(170px, 1fr)); gap:12px; }
      .area-card {
        position:relative; min-height:116px; padding:18px; border-radius:22px; display:flex; align-items:center; gap:16px; text-align:left;
        background:linear-gradient(135deg, color-mix(in srgb, var(--item-accent) 12%, ${theme.panel}), ${theme.panel});
        border:1px solid ${theme.border}; backdrop-filter:blur(18px);
        transition:transform .18s ease, background .18s ease, border-color .18s ease, box-shadow .18s ease;
      }
      .area-card:hover { background:linear-gradient(135deg, color-mix(in srgb, var(--item-accent) 18%, ${theme.panelStrong}), ${theme.panelStrong}); border-color:color-mix(in srgb, var(--item-accent) 44%, ${theme.border}); }
      .area-card:active, .back:active { transform:scale(.96); }
      .area-icon {
        width:56px; height:56px; flex:0 0 auto; display:grid; place-items:center; border-radius:18px;
        background:color-mix(in srgb, var(--item-accent) 18%, ${theme.panelStrong}); border:1px solid color-mix(in srgb, var(--item-accent) 40%, ${theme.border});
      }
      .area-icon ha-icon { color:var(--item-accent); --mdc-icon-size:32px; }
      .area-copy { min-width:0; display:grid; gap:5px; }
      .area-copy strong { font-size:16px; line-height:1.15; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .area-copy small { margin:0; }
      .device-strip { display:grid; grid-template-columns:repeat(auto-fit, minmax(92px, 1fr)); gap:10px; margin-bottom:14px; }
      .device {
        position:relative; min-height:76px; border-radius:18px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;
        background:${theme.panel}; border:1px solid ${theme.border}; backdrop-filter:blur(18px);
        transition:transform .18s ease, background .18s ease, border-color .18s ease, box-shadow .18s ease;
      }
      .device:hover, .action:hover, .power-room:hover, .power-device:hover, .refresh-room:hover, .focus-remote:hover, .back:hover { background:${theme.panelStrong}; }
      .device:active, .action:active, .power-room:active, .power-device:active, .refresh-room:active, .focus-remote:active { transform:scale(.96); }
      button[aria-busy="true"] ha-icon { animation:wand-spin .75s linear infinite; }
      button:disabled { cursor:wait; opacity:.72; }
      .device.selected { border-color:color-mix(in srgb, var(--item-accent) 62%, transparent); box-shadow:0 0 0 3px color-mix(in srgb, var(--item-accent) 15%, transparent); background:linear-gradient(135deg, color-mix(in srgb, var(--item-accent) 22%, ${theme.panelStrong}), ${theme.panelStrong}); }
      .device.source-active { border-color:#22c55e; box-shadow:0 0 0 3px rgba(34,197,94,.14), 0 10px 24px rgba(34,197,94,.10); }
      .device ha-icon { color:var(--item-accent); --mdc-icon-size:26px; }
      .device span { max-width:100%; padding:0 8px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-weight:760; }
      .device span { font-size:12px; color:${theme.muted}; }
      i { position:absolute; top:9px; right:9px; width:8px; height:8px; border-radius:50%; background:${theme.border}; }
      i.on { background:#22c55e; box-shadow:0 0 0 4px rgba(34,197,94,.12); }
      i.issue { background:#f59e0b; box-shadow:0 0 0 4px rgba(245,158,11,.14); }
      .device-header {
        justify-content:space-between; gap:16px; margin-bottom:14px; padding:15px; border-radius:20px;
        background:linear-gradient(135deg, color-mix(in srgb, var(--device-accent) 15%, ${theme.panel}), ${theme.panel});
        border:1px solid color-mix(in srgb, var(--device-accent) 36%, ${theme.border});
      }
      .control-copy { min-width:0; flex:1 1 auto; }
      .media-preview { width:58px; height:58px; flex:0 0 auto; border-radius:14px; object-fit:cover; border:1px solid ${theme.border}; background:${theme.panel}; box-shadow:0 10px 26px ${theme.shadow}; }
      .control-chips { display:flex; gap:8px; flex-wrap:wrap; margin-top:9px; }
      .control-chips span { max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:5px 8px; border-radius:999px; background:${theme.panel}; border:1px solid ${theme.border}; color:${theme.muted}; font-size:11px; font-weight:800; }
      .control-chips .active { color:#22c55e; border-color:rgba(34,197,94,.42); background:rgba(34,197,94,.10); }
      .remote-host { width:100%; min-height:320px; border-radius:22px; overflow:hidden; isolation:isolate; }
      .remote-host > * { display:block; width:100%; }
      .remote-host.embedded { background:transparent; }
      .remote-host[data-error]::before { content:attr(data-error); display:block; margin-bottom:10px; color:${theme.muted}; font-size:12px; text-align:center; }
      .manual-remote { display:grid; gap:12px; padding:16px; border-radius:22px; border:1px solid color-mix(in srgb, var(--accent) 30%, ${theme.border}); background:${theme.panel}; }
      .row { display:flex; justify-content:center; gap:10px; flex-wrap:wrap; }
      .action, .wide { min-width:52px; height:52px; border-radius:16px; display:grid; place-items:center; background:${theme.panel}; border:1px solid ${theme.border}; }
      .wide { padding:0 16px; }
      .touchpad { width:min(100%, 420px); height:150px; display:flex; flex-direction:column; gap:10px; border-radius:24px; font-weight:750; }
      .touchpad ha-icon { --mdc-icon-size:32px; }
      .fallback-note { color:${theme.muted}; font-size:12px; text-align:center; margin:6px 0 12px; }
      .empty-message { padding:28px; text-align:center; color:${theme.muted}; border:1px dashed ${theme.border}; border-radius:18px; }
      .focus-mode { position:fixed; inset:12px; z-index:999; overflow:auto; border-radius:26px; }
      .focus-mode .device-strip { grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); }
      .focus-mode .remote-host { max-width:900px; min-height:520px; margin:0 auto; }
      @keyframes wand-spin { to { transform:rotate(360deg); } }
      @media (max-width: 520px) {
        .wrap { padding:10px; border-radius:20px; }
        .control-header { grid-template-columns:auto 1fr; }
        .header-actions { grid-column:1 / -1; justify-content:flex-end; }
        h2 { font-size:21px; }
        .area-grid { grid-template-columns:1fr; }
        .device-strip { display:flex; gap:8px; overflow-x:auto; scrollbar-width:none; scroll-snap-type:x proximity; padding:2px; }
        .device-strip::-webkit-scrollbar { display:none; }
        .device { min-width:88px; min-height:66px; scroll-snap-align:start; }
        .device-header { padding:10px; margin-bottom:8px; }
        .control-chips { display:none; }
        .remote-host { min-height:390px; border-radius:18px; }
        .focus-mode { inset:0; border-radius:0; padding:8px; }
        .focus-mode .remote-host { min-height:calc(100dvh - 180px); }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { scroll-behavior:auto !important; transition:none !important; animation-duration:.01ms !important; }
      }
    `;
  }

  _escape(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }
}

class WandRemoteCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = clone(DEFAULT_CONFIG);
    this._roomIndex = 0;
    this._deviceIndex = 0;
    this._entityListSignature = "";
  }

  setConfig(config) {
    const nextConfig = { ...clone(DEFAULT_CONFIG), ...clone(config || {}) };
    if (JSON.stringify(nextConfig) === JSON.stringify(this._config)) return;
    this._config = nextConfig;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._refreshEntityLists();
    const nestedEditor = this.shadowRoot?.querySelector("[data-universal-editor]")?.firstElementChild;
    if (nestedEditor) nestedEditor.hass = hass;
  }

  _render() {
    const room = this._config.rooms?.[this._roomIndex] || this._config.rooms?.[0];
    const device = room?.devices?.[this._deviceIndex] || room?.devices?.[0];
    this.shadowRoot.innerHTML = `
      <style>${this._styles()}</style>
      <div class="editor">
        <section class="editor-card">
          <div class="section-title">
            <div><h3>Basics</h3><p>Choose how the remote appears and behaves.</p></div>
          </div>
          <div class="field-grid two">
            <label>Title<input data-root="title" value="${this._escape(this._config.title || "")}"></label>
            <label>Theme<select data-root="theme">${Object.keys(THEMES).map((key) => `<option value="${key}" ${this._config.theme === key ? "selected" : ""}>${key.replace("_", " ")}</option>`).join("")}</select></label>
          </div>
          <details>
            <summary>Display options</summary>
            <div class="toggles">
              ${this._toggle("use_universal_remote_card", "Embed universal-remote-card")}
              ${this._toggle("show_power_bar", "Show room power")}
              ${this._toggle("show_refresh_button", "Show refresh")}
              ${this._toggle("show_entity_status", "Show status")}
              ${this._toggle("show_media_preview", "Show media preview")}
              ${this._toggle("show_now_controlling", "Show now controlling")}
              ${this._toggle("show_unavailable_devices", "Show unavailable devices")}
              ${this._toggle("persist_navigation", "Remember selected area")}
            </div>
            <label>Remote card type<input data-root="universal_remote_card_type" value="${this._escape(this._config.universal_remote_card_type || "custom:universal-remote-card")}"></label>
          </details>
        </section>

        <section class="editor-card">
          <div class="section-title">
            <div><h3>Areas</h3><p>Create landing-page areas, then configure each area’s devices.</p></div>
          </div>
          <div class="toolbar">
            <select data-select-room>${(this._config.rooms || []).map((item, index) => `<option value="${index}" ${index === this._roomIndex ? "selected" : ""}>${this._escape(item.name || "Room")}</option>`).join("")}</select>
            <button data-add-room>Add area</button>
            <button data-remove-room>Remove</button>
          </div>
        </section>

        ${room ? this._roomEditor(room) : ""}

        ${room ? `
          <section class="editor-card">
          <div class="section-title">
            <div><h3>Devices</h3><p>Select which device or media player appears in this area.</p></div>
          </div>
          <div class="toolbar">
            <select data-select-device>${(room.devices || []).map((item, index) => `<option value="${index}" ${index === this._deviceIndex ? "selected" : ""}>${this._escape(item.name || "Device")}</option>`).join("")}</select>
            <button data-add-device>Add device</button>
            <button data-remove-device>Remove</button>
          </div>
          </section>
        ` : ""}

        ${device ? this._deviceEditor(device) : ""}
      </div>
    `;

    this._bindEvents();
    this._refreshEntityLists();
    this._mountUniversalRemoteEditor(device);
  }

  _roomEditor(room) {
    return `
      <section class="editor-card">
        <div class="section-title">
          <div><h3>Area Details</h3><p>This is the tile shown on the first screen.</p></div>
        </div>
        <div class="field-grid three">
          <label>Name<input data-room="name" value="${this._escape(room.name || "")}"></label>
          <label>Icon<input data-room="icon" value="${this._escape(room.icon || "")}"></label>
          <label>Accent<input type="color" data-room="accent" value="${this._escape(room.accent || "#38bdf8")}"></label>
        </div>
        ${this._entityPicker("source_entity_id", "Source/status media player", room.source_entity_id, "media_player", "room")}
        <details>
          <summary>Area header controls</summary>
          <div class="toggles">
            <label class="check"><input type="checkbox" data-room-check="show_power_button" ${room.show_power_button !== false ? "checked" : ""}> Show power button</label>
            <label class="check"><input type="checkbox" data-room-check="show_refresh_button" ${room.show_refresh_button !== false ? "checked" : ""}> Show refresh button</label>
          </div>
          ${this._scriptPicker("room-refresh", "Refresh script", room.refresh_action)}
          ${this._actionEditor("room-power-on", "Power on script/service", room.power_on_action)}
          ${this._actionEditor("room-power-off", "Power off script/service", room.power_off_action)}
          ${this._actionEditor("room-refresh", "Refresh/reload script/service", room.refresh_action)}
        </details>
      </section>
    `;
  }

  _deviceEditor(device) {
    return `
      <section class="editor-card">
        <div class="section-title">
          <div><h3>Device Details</h3><p>How this device appears in the area.</p></div>
        </div>
        <div class="field-grid three">
          <label>Name<input data-device="name" value="${this._escape(device.name || "")}"></label>
          <label>Icon<input data-device="icon" value="${this._escape(device.icon || "")}"></label>
          <label>Accent<input type="color" data-device="accent" value="${this._escape(device.accent || "#38bdf8")}"></label>
        </div>
      </section>

      <section class="editor-card">
        <div class="section-title">
          <div><h3>Remote Essentials</h3><p>Pick the entities the remote should control.</p></div>
        </div>
        <label>Platform<select data-device="platform">
          ${["", "Apple TV", "Samsung TV", "Denon AVR", "Tata Play", "Google TV", "Fire TV", "Roku", "Kodi", "Android TV", "Generic"].map((name) => `<option value="${this._escape(name)}" ${device.platform === name ? "selected" : ""}>${this._escape(name || "Auto / custom")}</option>`).join("")}
        </select></label>
        ${this._entityPicker("remote_id", "Remote entity", device.remote_id, "remote")}
        ${this._entityPicker("media_player_id", "Media player", device.media_player_id, "media_player")}
        ${this._entityPicker("power_entity", "Power/status entity", device.power_entity, "")}
        ${this._entityPicker("source_entity_id", "Source switcher media player", device.source_entity_id, "media_player")}
        ${this._sourceNameInput(device)}
        <div class="quick-actions">
          <button data-sync-card-config>Sync from card config</button>
          <button data-use-media-power>Use media player for power</button>
        </div>
        <details>
          <summary>Remote buttons</summary>
          ${this._rowsEditor(device)}
        </details>
        <details>
          <summary>Universal remote card reference</summary>
          <div class="nested-editor" data-universal-editor>
            <div class="notice">Use Wand Remote buttons above for layout editing and live preview. Use Advanced JSON bridge below for universal-remote-card settings not listed above.</div>
          </div>
        </details>
      </section>

      <section class="editor-card">
        <div class="section-title">
          <div><h3>Behavior</h3><p>Optional scripts for switching and power sequencing.</p></div>
        </div>
        ${this._scriptPicker("device-switch", "Source/input script", device.switch_action)}
        ${this._scriptPicker("device-refresh", "Refresh script", device.refresh_action)}
        ${this._actionEditor("device-switch", "Run when selected", device.switch_action)}
        ${this._actionEditor("device-power-on", "Power on action", device.power_on_action)}
        ${this._actionEditor("device-power-off", "Power off action", device.power_off_action)}
        ${this._actionEditor("device-refresh", "Refresh/reload action", device.refresh_action)}
        <label class="check"><input type="checkbox" data-device-check="hidden_when_off" ${device.hidden_when_off ? "checked" : ""}> Hide when unavailable filter is active</label>
        <label class="check"><input type="checkbox" data-device-check="use_universal_remote_card" ${device.use_universal_remote_card ?? this._config.use_universal_remote_card ? "checked" : ""}> Use universal-remote-card for this device</label>
        <label class="check"><input type="checkbox" data-device-check="auto_select_source" ${device.auto_select_source ? "checked" : ""}> Select source when tapped</label>
        <label class="check"><input type="checkbox" data-device-check="home_on_select" ${device.home_on_select ? "checked" : ""}> Send Home when tapped</label>
        <label>Home command<input data-device="home_command" value="${this._escape(device.home_command || "auto")}" placeholder="auto"></label>
        <label>Delay before Home<input type="number" min="0" step="100" data-device-number="select_delay_ms" value="${this._escape(device.select_delay_ms ?? 900)}"></label>
      </section>

      <section class="editor-card">
        <details>
        <summary>Advanced JSON bridge</summary>
        <label>Universal remote card config<textarea data-device-json="card_config">${this._escape(JSON.stringify(device.card_config || this._deviceToCardConfig(device), null, 2))}</textarea></label>
        </details>
      </section>
    `;
  }

  _rowsEditor(device) {
    const rows = this._cardRows(device);
    const options = [
      "back", "power", "wakeup", "suspend", "home", "menu", "top_menu",
      "touchpad", "volume_buttons", "volume_up", "volume_down", "volume_mute", "mute", "slider",
      "rewind", "previous", "play_pause", "next", "fast_forward",
      "channel_up", "channel_down", "up", "down", "left", "right", "select",
      "netflix", "youtube", "primevideo",
      "n0", "n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9"
    ];
    return `
      <div class="rows-builder" data-rows-builder>
        <div class="section-head">
          <strong>Remote buttons</strong>
          <button data-add-remote-row>Add row</button>
        </div>
        ${rows.map((row, rowIndex) => `
          <div class="remote-row-editor">
            <span>Row ${rowIndex + 1}</span>
            ${(Array.isArray(row) ? row : [row]).map((item, actionIndex) => {
              const key = Array.isArray(item) ? item[0] : item;
              return `
                <label>
                  <select data-remote-row-action="${rowIndex}:${actionIndex}">
                    ${[...new Set([...options, key])].map((option) => `<option value="${this._escape(option)}" ${key === option ? "selected" : ""}>${this._escape(option.replaceAll("_", " "))}</option>`).join("")}
                  </select>
                  <button data-remove-remote-action="${rowIndex}:${actionIndex}">Remove</button>
                </label>
              `;
            }).join("")}
            <div class="quick-actions">
              <button data-add-remote-action="${rowIndex}">Add button</button>
              <button data-remove-remote-row="${rowIndex}">Remove row</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  _entityPicker(field, label, value, domain, scope = "device") {
    const listId = `wand-${scope}-${field}-${domain || "all"}`;
    return `
      <label>${this._escape(label)}
        <input data-entity-input="${this._escape(field)}" data-entity-scope="${this._escape(scope)}" data-domain="${this._escape(domain)}" list="${listId}" value="${this._escape(value || "")}" placeholder="${this._escape(domain ? `${domain}.example` : "media_player.example")}">
        <datalist id="${listId}">${this._entityOptions(domain)}</datalist>
      </label>
    `;
  }

  _entityOptions(domain) {
    if (!this._hass?.states) return "";
    return Object.keys(this._hass.states)
      .filter((entityId) => !domain || entityId.startsWith(`${domain}.`))
      .sort()
      .map((entityId) => `<option value="${this._escape(entityId)}"></option>`)
      .join("");
  }

  _sourceNameInput(device) {
    const sourceEntity = device.source_entity_id || this._room()?.source_entity_id || "";
    const sources = this._sourceList(sourceEntity);
    const value = this._escape(device.source_name || device.name || "");
    if (!sources.length) {
      return `<label>Source name<input data-device="source_name" value="${value}" placeholder="Apple TV, Google TV, HDMI 1"></label>`;
    }
    return `
      <label>Source name
        <select data-device="source_name">
          <option value="">Use device name</option>
          ${sources.map((source) => `<option value="${this._escape(source)}" ${device.source_name === source ? "selected" : ""}>${this._escape(source)}</option>`).join("")}
        </select>
      </label>
    `;
  }

  _sourceList(entityId) {
    const sources = this._hass?.states?.[entityId]?.attributes?.source_list;
    return Array.isArray(sources) ? sources : [];
  }

  _actionEditor(kind, label, action) {
    const value = action?.service || "";
    const data = action?.service_data ? JSON.stringify(action.service_data) : "";
    const target = action?.target ? JSON.stringify(action.target) : "";
    return `
      <details class="sub-details">
        <summary>${this._escape(label)}</summary>
        <label>Service<input data-action-service="${kind}" value="${this._escape(value)}" placeholder="script.turn_on or media_player.select_source"></label>
        <label>Target JSON<input data-action-target="${kind}" value="${this._escape(target)}" placeholder='{"entity_id":"script.example"}'></label>
        <label>Data JSON<input data-action-data="${kind}" value="${this._escape(data)}" placeholder='{"source":"Apple TV"}'></label>
      </details>
    `;
  }

  _scriptPicker(kind, label, action) {
    const script = this._scriptFromAction(action);
    const listId = `wand-${kind}-scripts`;
    return `
      <label>${this._escape(label)}
        <input data-action-script="${this._escape(kind)}" data-domain="script" list="${listId}" value="${this._escape(script)}" placeholder="script.dining_samsung_the_frame_65_source_hdmi_1">
        <datalist id="${listId}">${this._entityOptions("script")}</datalist>
      </label>
    `;
  }

  _scriptFromAction(action) {
    if (!action) return "";
    if (String(action.service || "").startsWith("script.") && action.service !== "script.turn_on") return action.service;
    const target = action.target?.entity_id;
    if (Array.isArray(target)) return target[0] || "";
    return target || "";
  }

  _toggle(field, label) {
    return `<label class="check"><input type="checkbox" data-root-check="${field}" ${this._config[field] ? "checked" : ""}> ${this._escape(label)}</label>`;
  }

  _bindEvents() {
    this.shadowRoot.querySelectorAll("[data-root]").forEach((input) => input.addEventListener("change", () => {
      this._config[input.dataset.root] = input.value;
      this._changed();
    }));
    this.shadowRoot.querySelectorAll("[data-root-check]").forEach((input) => input.addEventListener("change", () => {
      this._config[input.dataset.rootCheck] = input.checked;
      this._changed();
    }));
    this.shadowRoot.querySelector("[data-select-room]")?.addEventListener("change", (event) => {
      this._roomIndex = Number(event.target.value);
      this._deviceIndex = 0;
      this._emitPreviewSelection();
      this._render();
    });
    this.shadowRoot.querySelector("[data-select-device]")?.addEventListener("change", (event) => {
      this._deviceIndex = Number(event.target.value);
      this._emitPreviewSelection();
      this._render();
    });
    this.shadowRoot.querySelectorAll("[data-room]").forEach((input) => input.addEventListener("change", () => this._updateRoom(input)));
    this.shadowRoot.querySelectorAll("[data-room-check]").forEach((input) => input.addEventListener("change", () => {
      this._room()[input.dataset.roomCheck] = input.checked;
      this._changed();
    }));
    this.shadowRoot.querySelectorAll("[data-device]").forEach((input) => input.addEventListener("change", () => this._updateDevice(input)));
    this.shadowRoot.querySelectorAll("[data-entity-input]").forEach((input) => input.addEventListener("change", () => this._updateEntityInput(input)));
    this.shadowRoot.querySelectorAll("[data-device-check]").forEach((input) => input.addEventListener("change", () => {
      this._device()[input.dataset.deviceCheck] = input.checked;
      this._changed();
    }));
    this.shadowRoot.querySelectorAll("[data-device-number]").forEach((input) => input.addEventListener("change", () => {
      this._device()[input.dataset.deviceNumber] = Number(input.value || 0);
      this._changed();
    }));
    this.shadowRoot.querySelectorAll("[data-device-json]").forEach((input) => input.addEventListener("change", () => this._updateJson(input)));
    this.shadowRoot.querySelectorAll("[data-action-script]").forEach((input) => input.addEventListener("change", () => this._updateScriptAction(input)));
    this.shadowRoot.querySelectorAll("[data-action-service],[data-action-target],[data-action-data]").forEach((input) => input.addEventListener("change", () => this._updateAction(input)));
    this._bindRowsEditor();
    this.shadowRoot.querySelector("[data-add-room]")?.addEventListener("click", () => this._addRoom());
    this.shadowRoot.querySelector("[data-remove-room]")?.addEventListener("click", () => this._removeRoom());
    this.shadowRoot.querySelector("[data-add-device]")?.addEventListener("click", () => this._addDevice());
    this.shadowRoot.querySelector("[data-remove-device]")?.addEventListener("click", () => this._removeDevice());
    this.shadowRoot.querySelector("[data-sync-card-config]")?.addEventListener("click", () => this._syncFromCardConfig(true));
    this.shadowRoot.querySelector("[data-use-media-power]")?.addEventListener("click", () => {
      const device = this._device();
      device.power_entity = device.media_player_id || device.card_config?.media_player_id || "";
      this._syncDeviceCardConfig();
      this._changed();
    });
  }

  _refreshEntityLists() {
    if (!this._hass || !this.shadowRoot) return;
    const entityIds = Object.keys(this._hass.states || {}).sort();
    const signature = entityIds.join("\n");
    if (signature === this._entityListSignature) return;
    this._entityListSignature = signature;
    const optionCache = new Map();
    this.shadowRoot.querySelectorAll("datalist").forEach((list) => {
      const input = this.shadowRoot.querySelector(`[list="${list.id}"]`);
      const domain = input?.dataset.domain || "";
      if (!optionCache.has(domain)) optionCache.set(domain, this._entityOptions(domain));
      list.innerHTML = optionCache.get(domain);
    });
  }

  _bindRowsEditor() {
    this.shadowRoot.querySelectorAll("[data-remote-row-action]").forEach((input) => input.addEventListener("change", () => this._updateRemoteRowAction(input)));
    this.shadowRoot.querySelectorAll("[data-add-remote-action]").forEach((button) => button.addEventListener("click", () => this._addRemoteAction(Number(button.dataset.addRemoteAction))));
    this.shadowRoot.querySelectorAll("[data-remove-remote-action]").forEach((button) => button.addEventListener("click", () => this._removeRemoteAction(button.dataset.removeRemoteAction)));
    this.shadowRoot.querySelector("[data-add-remote-row]")?.addEventListener("click", () => this._addRemoteRow());
    this.shadowRoot.querySelectorAll("[data-remove-remote-row]").forEach((button) => button.addEventListener("click", () => this._removeRemoteRow(Number(button.dataset.removeRemoteRow))));
  }

  _refreshRowsEditor() {
    const rowsBuilder = this.shadowRoot.querySelector("[data-rows-builder]");
    if (!rowsBuilder) return;
    const template = document.createElement("template");
    template.innerHTML = this._rowsEditor(this._device()).trim();
    rowsBuilder.replaceWith(template.content.firstElementChild);
    this._bindRowsEditor();
  }

  _refreshNestedEditorConfig() {
    const editorElement = this.shadowRoot?.querySelector("[data-universal-editor]")?.firstElementChild;
    if (typeof editorElement?.setConfig !== "function") return;
    this._syncingNestedEditor = true;
    try {
      editorElement.setConfig(this._deviceToCardConfig(this._device()));
    } finally {
      this._syncingNestedEditor = false;
    }
  }

  _mountUniversalRemoteEditor(device) {
    const host = this.shadowRoot?.querySelector("[data-universal-editor]");
    if (!host || !device) return;

    const cardConfig = this._deviceToCardConfig(device);
    const elementName = String(cardConfig.type || "custom:universal-remote-card").replace(/^custom:/, "");
    const cardClass = customElements.get(elementName);
    const editorFactory = cardClass?.getConfigElement;
    const editorElement = typeof editorFactory === "function" ? editorFactory.call(cardClass) : customElements.get(`${elementName}-editor`) ? document.createElement(`${elementName}-editor`) : null;

    if (!editorElement) return;

    host.replaceChildren(editorElement);
    if (this._hass) editorElement.hass = this._hass;
    if (typeof editorElement.setConfig === "function") editorElement.setConfig(cardConfig);
  }

  _emitPreviewSelection(notify = true) {
    const room = this._room();
    const device = room?.devices?.[this._deviceIndex];
    this._config.editor_preview_selection = {
      room_id: room?.id || "",
      device_id: device?.id || "",
      nonce: Date.now()
    };
    if (notify) this._changed();
  }

  _room() {
    return this._config.rooms[this._roomIndex];
  }

  _device() {
    return this._room().devices[this._deviceIndex];
  }

  _updateRoom(input) {
    const room = this._room();
    room[input.dataset.room] = input.value;
    if (input.dataset.room === "name") room.id = slug(input.value);
    this._changed();
  }

  _updateDevice(input) {
    const device = this._device();
    device[input.dataset.device] = input.value;
    if (input.dataset.device === "name") device.id = slug(input.value);
    if (input.dataset.device === "name" && !this._cleanSourceName(device.source_name)) device.source_name = input.value;
    this._syncDeviceCardConfig();
    this._changed();
  }

  _updateEntityInput(input) {
    if (input.dataset.entityScope === "room") {
      this._room()[input.dataset.entityInput] = input.value.trim();
      this._changed();
      return;
    }

    const device = this._device();
    device[input.dataset.entityInput] = input.value.trim();
    if (input.dataset.entityInput === "media_player_id" && !device.power_entity) {
      device.power_entity = device.media_player_id;
    }
    this._syncDeviceCardConfig();
    this._changed();
  }

  _cardRows(device = this._device()) {
    const rows = device.card_config?.rows || device.rows || DEFAULT_REMOTE_ROWS;
    return clone(rows);
  }

  _setCardRows(rows) {
    const device = this._device();
    device.card_config = {
      ...(device.card_config || this._deviceToCardConfig(device)),
      rows
    };
    device.rows = rows;
    this._emitPreviewSelection(false);
    this._changed();
    this._refreshRowsEditor();
    this._refreshNestedEditorConfig();
  }

  _updateRemoteRowAction(input) {
    const [rowIndex, actionIndex] = input.dataset.remoteRowAction.split(":").map(Number);
    const rows = this._cardRows();
    rows[rowIndex][actionIndex] = input.value === "volume_buttons" ? ["volume_buttons"] : input.value;
    this._setCardRows(rows);
  }

  _addRemoteRow() {
    const rows = this._cardRows();
    rows.push(["back", "home", "menu"]);
    this._setCardRows(rows);
  }

  _removeRemoteRow(rowIndex) {
    const rows = this._cardRows();
    if (rows.length <= 1) return;
    rows.splice(rowIndex, 1);
    this._setCardRows(rows);
  }

  _addRemoteAction(rowIndex) {
    const rows = this._cardRows();
    rows[rowIndex] = rows[rowIndex] || [];
    rows[rowIndex].push("select");
    this._setCardRows(rows);
  }

  _removeRemoteAction(pointer) {
    const [rowIndex, actionIndex] = pointer.split(":").map(Number);
    const rows = this._cardRows();
    if ((rows[rowIndex] || []).length <= 1) return;
    rows[rowIndex].splice(actionIndex, 1);
    this._setCardRows(rows);
  }

  _updateJson(input) {
    try {
      this._device()[input.dataset.deviceJson] = JSON.parse(input.value || "{}");
      if (input.dataset.deviceJson === "card_config") this._syncFromCardConfig(false);
      input.setCustomValidity("");
      this._changed();
      if (input.dataset.deviceJson === "card_config") {
        this._refreshRowsEditor();
        this._refreshNestedEditorConfig();
      }
    } catch (err) {
      input.setCustomValidity("Must be valid JSON.");
      input.reportValidity();
    }
  }

  _updateScriptAction(input) {
    const path = this._actionPath(input.dataset.actionScript);
    if (!path) return;
    const owner = path.owner === "room" ? this._room() : this._device();
    const entityId = input.value.trim();
    owner[path.field] = entityId ? { service: "script.turn_on", target: { entity_id: entityId } } : null;
    this._changed();
  }

  _syncFromCardConfig(render = false) {
    const device = this._device();
    const config = device.card_config || {};
    device.remote_id = config.remote_id || device.remote_id || "";
    device.media_player_id = config.media_player_id || device.media_player_id || "";
    device.platform = config.platform || device.platform || "";
    device.source_name = this._cleanSourceName(device.source_name) || config.source || config.platform || device.name || "";
    device.power_entity = device.power_entity || device.media_player_id || device.remote_id || "";
    if (config.rows) device.rows = clone(config.rows);
    if (config.custom_actions) device.custom_actions = clone(config.custom_actions);
    this._syncDeviceCardConfig();
    this._changed(render);
  }

  _updateAction(input) {
    const kind = input.dataset.actionService || input.dataset.actionTarget || input.dataset.actionData;
    const path = this._actionPath(kind);
    const owner = path.owner === "room" ? this._room() : this._device();
    const current = isObject(owner[path.field]) ? owner[path.field] : {};
    const service = this.shadowRoot.querySelector(`[data-action-service="${kind}"]`)?.value || "";
    const targetRaw = this.shadowRoot.querySelector(`[data-action-target="${kind}"]`)?.value || "";
    const dataRaw = this.shadowRoot.querySelector(`[data-action-data="${kind}"]`)?.value || "";

    if (!service) {
      owner[path.field] = null;
      this._changed();
      return;
    }

    try {
      owner[path.field] = {
        ...current,
        service,
        target: targetRaw ? JSON.parse(targetRaw) : undefined,
        service_data: dataRaw ? JSON.parse(dataRaw) : undefined
      };
      this._changed();
    } catch (err) {
      input.setCustomValidity("Target and data must be valid JSON.");
      input.reportValidity();
    }
  }

  _actionPath(kind) {
    return {
      "room-power-on": { owner: "room", field: "power_on_action" },
      "room-power-off": { owner: "room", field: "power_off_action" },
      "room-refresh": { owner: "room", field: "refresh_action" },
      "device-switch": { owner: "device", field: "switch_action" },
      "device-power-on": { owner: "device", field: "power_on_action" },
      "device-power-off": { owner: "device", field: "power_off_action" },
      "device-refresh": { owner: "device", field: "refresh_action" }
    }[kind];
  }

  _syncDeviceCardConfig() {
    const device = this._device();
    device.card_config = {
      ...(device.card_config || {}),
      type: (device.card_config || {}).type || this._config.universal_remote_card_type || "custom:universal-remote-card",
      remote_id: device.remote_id || undefined,
      media_player_id: device.media_player_id || undefined,
      platform: device.platform || undefined
    };
  }

  _deviceToCardConfig(device) {
    return {
      ...(device.card_config || {}),
      type: device.card_config?.type || this._config.universal_remote_card_type || "custom:universal-remote-card",
      remote_id: device.remote_id || device.card_config?.remote_id || undefined,
      media_player_id: device.media_player_id || device.card_config?.media_player_id || undefined,
      platform: device.platform || device.card_config?.platform || undefined,
      custom_actions: device.card_config?.custom_actions || device.custom_actions || [],
      rows: device.card_config?.rows || device.rows || DEFAULT_REMOTE_ROWS
    };
  }

  _addRoom() {
    this._config.rooms = this._config.rooms || [];
    this._config.rooms.push({
      id: "new_room",
      name: "New Room",
      icon: "mdi:sofa",
      accent: "#38bdf8",
      source_entity_id: "",
      show_power_button: true,
      show_refresh_button: true,
      power_on_action: null,
      power_off_action: null,
      refresh_action: null,
      devices: []
    });
    this._roomIndex = this._config.rooms.length - 1;
    this._deviceIndex = 0;
    this._changed(true);
  }

  _removeRoom() {
    if ((this._config.rooms || []).length <= 1) return;
    this._config.rooms.splice(this._roomIndex, 1);
    this._roomIndex = Math.max(0, this._roomIndex - 1);
    this._deviceIndex = 0;
    this._changed(true);
  }

  _addDevice() {
    const room = this._room();
    room.devices = room.devices || [];
    room.devices.push({
      id: "new_device",
      name: "New Device",
      icon: "mdi:remote",
      accent: room.accent || "#38bdf8",
      platform: "",
      remote_id: "",
      media_player_id: "",
      power_entity: "",
      source_entity_id: "",
      source_name: "New Device",
      auto_select_source: true,
      home_on_select: true,
      home_command: "auto",
      select_delay_ms: 900,
      refresh_action: null,
      card_config: {
        type: this._config.universal_remote_card_type || "custom:universal-remote-card",
        custom_actions: [],
        rows: DEFAULT_REMOTE_ROWS
      }
    });
    this._deviceIndex = room.devices.length - 1;
    this._changed(true);
  }

  _removeDevice() {
    const room = this._room();
    if ((room.devices || []).length <= 1) return;
    room.devices.splice(this._deviceIndex, 1);
    this._deviceIndex = Math.max(0, this._deviceIndex - 1);
    this._changed(true);
  }

  _changed(render = false) {
    if (!this._updatingPreviewSelection) {
      this._updatingPreviewSelection = true;
      this._emitPreviewSelection(false);
      this._updatingPreviewSelection = false;
    }
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: clone(this._config) }, bubbles: true, composed: true }));
    if (render) this._render();
  }

  _styles() {
    return `
      .editor { display:grid; gap:14px; color:var(--primary-text-color); }
      section { display:grid; gap:12px; }
      .editor-card { padding:16px; border:1px solid var(--divider-color); border-radius:14px; background:color-mix(in srgb, var(--card-background-color) 88%, transparent); }
      .section-title { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
      .section-title h3 { margin:0 0 4px; }
      .section-title p { margin:0; color:var(--secondary-text-color); font-size:12px; line-height:1.35; }
      h3 { margin:0; font-size:14px; letter-spacing:0; }
      label { display:grid; gap:6px; font-size:12px; font-weight:700; color:var(--secondary-text-color); }
      input, select, textarea { width:100%; min-height:40px; border:1px solid var(--divider-color); border-radius:10px; padding:9px 10px; background:var(--card-background-color); color:var(--primary-text-color); font:inherit; }
      textarea { min-height:160px; font-family:ui-monospace, SFMono-Regular, Consolas, monospace; font-size:12px; }
      .toolbar { display:grid; grid-template-columns:1fr auto auto; gap:8px; align-items:center; }
      button { border:1px solid var(--divider-color); border-radius:10px; padding:10px 12px; background:var(--card-background-color); color:var(--primary-text-color); font-weight:700; cursor:pointer; }
      button:hover { background:color-mix(in srgb, var(--primary-color) 10%, var(--card-background-color)); }
      .field-grid { display:grid; gap:10px; }
      .field-grid.two { grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); }
      .field-grid.three { grid-template-columns:repeat(auto-fit, minmax(145px, 1fr)); }
      .quick-actions { display:grid; grid-template-columns:repeat(auto-fit, minmax(170px, 1fr)); gap:8px; }
      .section-head { display:flex; align-items:center; justify-content:space-between; gap:10px; }
      .rows-builder { display:grid; gap:10px; }
      .remote-row-editor { display:grid; gap:8px; padding:10px; border:1px solid var(--divider-color); border-radius:12px; }
      .remote-row-editor > span { font-size:12px; font-weight:800; color:var(--secondary-text-color); text-transform:uppercase; letter-spacing:.08em; }
      .remote-row-editor label { grid-template-columns:1fr auto; align-items:end; }
      .nested-editor { display:block; margin-top:10px; }
      .notice { padding:12px; border:1px dashed var(--divider-color); border-radius:10px; color:var(--secondary-text-color); font-size:12px; line-height:1.4; }
      .toggles { display:grid; grid-template-columns:repeat(auto-fit, minmax(190px, 1fr)); gap:8px; }
      .check { display:flex; align-items:center; gap:8px; color:var(--primary-text-color); }
      .check input { width:auto; min-height:auto; }
      details { border:1px solid var(--divider-color); border-radius:12px; padding:0; display:grid; gap:10px; overflow:hidden; background:color-mix(in srgb, var(--card-background-color) 70%, transparent); }
      details[open] { padding-bottom:10px; }
      summary { cursor:pointer; font-weight:800; color:var(--primary-text-color); padding:12px; list-style:none; }
      summary::-webkit-details-marker { display:none; }
      summary::after { content:"+"; float:right; color:var(--secondary-text-color); }
      details[open] > summary::after { content:"-"; }
      details > label, details > .toggles, details > .rows-builder, details > .nested-editor { margin:0 10px; }
      .sub-details { background:transparent; }
      details label { margin-top:10px; }
    `;
  }

  _escape(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }
}

customElements.define("wand-remote-card", WandRemoteCard);
customElements.define("wand-remote-card-editor", WandRemoteCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "wand-remote-card",
  name: "Wand Universal Remote",
  description: "Room, device, power, script, and universal-remote-card orchestration.",
  preview: true,
  documentationURL: "https://github.com/architechlabs/wand"
});

console.info(`%cWAND-REMOTE-CARD ${VERSION}`, "color:#38bdf8;font-weight:700");
