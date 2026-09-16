import React, { useState, useEffect } from "react"
import MacWindow from "./MacWindow"
import "./Settings.scss"

const getSavedSettings = () => {
  const saved = JSON.parse(localStorage.getItem("ui-settings") || "{}")
  const soundLevel = Math.min(100, Math.max(0, saved.soundLevel ?? 100))

  return {
    focusMode: saved.focusMode ?? false,
    sound: soundLevel > 0 ? (saved.sound ?? true) : false,
    soundLevel,
    autoCloseAfterUnlock: saved.autoCloseAfterUnlock ?? false,
    brightness: Math.min(100, Math.max(50, saved.brightness ?? 100)),
    dockSize: Math.min(140, Math.max(70, saved.dockSize ?? 100)),
  }
}

const describeSoundLevel = (value) => {
  if (value === 0) return "Muted"
  if (value < 35) return "Soft"
  if (value < 75) return "Balanced"
  return "Immersive"
}

const describeBrightness = (value) => {
  if (value < 65) return "Dim"
  if (value < 85) return "Comfort"
  return "Crisp"
}

const describeDockSize = (value) => {
  if (value < 85) return "Compact"
  if (value <= 115) return "Default"
  return "Large"
}

export default function Settings({ minimized, onClose, onMinimize, zIndex, onFocus, onResetDesktop }) {
  const initialSettings = getSavedSettings()

  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("wallpaper")
  const [focusMode, setFocusMode] = useState(initialSettings.focusMode)
  const [sound, setSound] = useState(initialSettings.sound)
  const [soundLevel, setSoundLevel] = useState(initialSettings.soundLevel)
  const [autoCloseAfterUnlock, setAutoCloseAfterUnlock] = useState(
    initialSettings.autoCloseAfterUnlock,
  )
  const [brightness, setBrightness] = useState(initialSettings.brightness)
  const [dockSize, setDockSize] = useState(initialSettings.dockSize)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [batteryHealthModalOpen, setBatteryHealthModalOpen] = useState(false)
  const [chargingModalOpen, setChargingModalOpen] = useState(false)
  const [chargeLimit, setChargeLimit] = useState(80)
  const [optimizedCharging, setOptimizedCharging] = useState(true)

  const [lowPowerMode, setLowPowerMode] = useState(
    () => JSON.parse(localStorage.getItem("ui-settings") || "{}").lowPowerMode || "Never"
  )

  const [batteryState, setBatteryState] = useState(() => {
    const startTime = Number(sessionStorage.getItem("manos-session-start") || Date.now())
    if (!sessionStorage.getItem("manos-session-start")) {
      sessionStorage.setItem("manos-session-start", startTime.toString())
    }
    const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000)
    // Deplete 1% every 3 minutes starting from 100%, clamped to min 15%
    const currentPct = Math.max(15, 100 - Math.floor(elapsedMinutes / 3))
    const charging = currentPct > 90 || elapsedMinutes < 2
    return { level: currentPct, charging }
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const startTime = Number(sessionStorage.getItem("manos-session-start") || Date.now())
      const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000)
      const currentPct = Math.max(15, 100 - Math.floor(elapsedMinutes / 3))
      const charging = currentPct > 90 || elapsedMinutes < 2
      setBatteryState({ level: currentPct, charging })
    }, 30000)
    return () => clearInterval(timer)
  }, [])

  const handleLowPowerMode = (val) => {
    setLowPowerMode(val)
    saveSetting("lowPowerMode", val)
    if (val === "Always" || (val === "On Battery Only" && !batteryState.charging)) {
      document.body.classList.add("low-power-mode")
    } else {
      document.body.classList.remove("low-power-mode")
    }
  }

  /* ---------------- SAVE & APPLY ON CHANGE ---------------- */
  const saveSetting = (key, value) => {
    const current = getSavedSettings()
    const updated = { ...current, [key]: value }
    localStorage.setItem("ui-settings", JSON.stringify(updated))

    // Apply changes instantly
    if (key === "focusMode") {
      document.body.classList.toggle("focus-mode", value)
    }
    if (key === "brightness") {
      document.documentElement.style.setProperty("--brightness", value + "%")
    }
    if (key === "dockSize") {
      document.documentElement.style.setProperty("--dock-size", (value / 100).toFixed(2))
    }

    // Notify desktop of changes
    window.dispatchEvent(new Event("settingsUpdated"))
  }

  const handleFocusMode = (val) => {
    setFocusMode(val)
    saveSetting("focusMode", val)
  }

  const handleSound = (val) => {
    const nextSoundLevel = val && soundLevel === 0 ? 100 : soundLevel

    setSound(val)
    setSoundLevel(nextSoundLevel)
    saveSetting("soundLevel", nextSoundLevel)
    saveSetting("sound", val)
  }

  const handleSoundLevel = (val) => {
    const clamped = Math.min(100, Math.max(0, val))
    const enabled = clamped > 0

    setSoundLevel(clamped)
    setSound(enabled)
    saveSetting("soundLevel", clamped)
    saveSetting("sound", enabled)
  }

  const handleAutoClose = (val) => {
    setAutoCloseAfterUnlock(val)
    saveSetting("autoCloseAfterUnlock", val)
  }

  const handleBrightness = (val) => {
    const clamped = Math.min(100, Math.max(50, val))
    setBrightness(clamped)
    saveSetting("brightness", clamped)
  }

  const handleDockSize = (val) => {
    const clamped = Math.min(140, Math.max(70, val))
    setDockSize(clamped)
    saveSetting("dockSize", clamped)
  }

  const handleResetConfirm = () => {
    setShowResetConfirm(false)
    if (onResetDesktop) {
      onResetDesktop()
    }
  }

  const WALL_KEY = "desktop_wallpaper"

  const wallpapers = [
    { id: "default", name: "Default Tahoe", type: "Landscape", url: "/bg.png" },
    { id: "tahoe", name: "Tahoe Lake", type: "Dynamic", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920" },
    { id: "sequoia", name: "Sequoia", type: "Dynamic", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1920" },
    { id: "macintosh", name: "Macintosh", type: "Monochrome", url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1920" },
    { id: "sonoma", name: "Sonoma", type: "Dynamic", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920" },
    { id: "yosemite", name: "Yosemite", type: "Landscape", url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1920" },
    { id: "redwood", name: "Redwood", type: "Landscape", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920" },
    { id: "bigsur", name: "Big Sur", type: "Landscape", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920" },
    { id: "catalina", name: "Catalina", type: "Landscape", url: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=1920" },
  ]

  const [currentWallpaper, setCurrentWallpaper] = useState(
    () => localStorage.getItem(WALL_KEY) || "/bg.png",
  )

  const handleSelectWallpaper = (url) => {
    setCurrentWallpaper(url)
    localStorage.setItem(WALL_KEY, url)

    const main = document.querySelector("main")
    if (main) {
      main.style.backgroundImage = `url(${url})`
      main.style.backgroundSize = "cover"
      main.style.backgroundPosition = "center"
      main.style.backgroundRepeat = "no-repeat"
    }

    if (window.notify) {
      window.notify({
        title: "Wallpaper Updated",
        message: "Applied new background wallpaper",
        type: "success",
        duration: 3000,
      })
    }
  }

  const [displayPreset, setDisplayPreset] = useState("default")

  const sidebarItems = [
    { id: "wallpaper", name: "Wallpaper", icon: "ri-image-line", bg: "#00c7be" },
    { id: "displays", name: "Displays", icon: "ri-sun-line", bg: "#007aff" },
    { id: "battery", name: "Battery", icon: "ri-battery-2-charge-line", bg: "#34c759" },
    { id: "sound", name: "Sound & Audio", icon: "ri-volume-up-fill", bg: "#ff2d55" },
    { id: "appearance", name: "Appearance & Dock", icon: "ri-layout-bottom-line", bg: "#5856d6" },
    { id: "privacy", name: "Lock Screen & Security", icon: "ri-lock-line", bg: "#8e8e93" },
    { id: "about", name: "About ManOS", icon: "ri-information-line", bg: "#ff9500" },
  ]

  const filteredSidebar = sidebarItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const initialX = Math.max(40, Math.floor((window.innerWidth - 760) / 2))
  const initialY = Math.max(50, Math.floor((window.innerHeight - 520) / 2))

  return (
    <MacWindow
      appId="settings"
      title="System Settings"
      minimized={minimized}
      onClose={onClose}
      onMinimize={onMinimize}
      zIndex={zIndex}
      onFocus={onFocus}
      allowMaximize={false}
      initialWidth={760}
      initialHeight={520}
      minWidth={700}
      minHeight={480}
      initialX={initialX}
      initialY={initialY}
    >
      <div className="macos-settings-window">
        {/* LEFT SIDEBAR */}
        <div className="settings-sidebar">
          <div className="sidebar-search">
            <i className="ri-search-line" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery("")}>
                ✕
              </button>
            )}
          </div>

          <div className="sidebar-profile">
            <div className="profile-avatar">
              <i className="ri-user-3-fill" />
            </div>
            <div className="profile-info">
              <span className="profile-name">Mannat Gupta</span>
              <span className="profile-sub">Portfolio Administrator</span>
            </div>
          </div>

          <div className="sidebar-menu">
            {filteredSidebar.map((item) => (
              <button
                key={item.id}
                className={`sidebar-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => setActiveTab(item.id)}
              >
                <div className="item-icon-box" style={{ backgroundColor: item.bg }}>
                  <i className={item.icon} />
                </div>
                <span className="item-name">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT DETAIL PANEL */}
        <div className="settings-main-content">
          <div className="content-nav-bar">
            <div className="nav-arrows">
              <button className="nav-arrow" disabled>
                <i className="ri-arrow-left-s-line" />
              </button>
              <button className="nav-arrow" disabled>
                <i className="ri-arrow-right-s-line" />
              </button>
            </div>
            <span className="current-header-title">
              {sidebarItems.find((i) => i.id === activeTab)?.name}
            </span>
          </div>

          <div className="content-scrollable">
            {/* WALLPAPER TAB */}
            {activeTab === "wallpaper" && (
              <div className="tab-pane wallpaper-pane">
                {/* Active Wallpaper Banner Card */}
                <div className="active-wallpaper-card">
                  <div
                    className="wallpaper-preview-hero"
                    style={{ backgroundImage: `url(${currentWallpaper})` }}
                  />
                  <div className="wallpaper-info-col">
                    <div className="wallpaper-title-row">
                      <span className="wallpaper-title">
                        {wallpapers.find((w) => w.url === currentWallpaper)?.name || "Default Wallpaper"}
                      </span>
                      <span className="wallpaper-type-badge">
                        {wallpapers.find((w) => w.url === currentWallpaper)?.type || "Desktop"}
                      </span>
                    </div>

                    <div className="wallpaper-status-msg">
                      <span>Active Background</span>
                    </div>
                  </div>
                </div>

                {/* All Wallpapers Section */}
                <div className="wallpaper-category-section">
                  <div className="category-header">
                    <h4>All Wallpapers</h4>
                    <span className="category-count">({wallpapers.length})</span>
                  </div>
                  <div className="wallpaper-grid">
                    {wallpapers.map((item) => (
                      <div
                        key={item.id}
                        className={`wallpaper-item ${currentWallpaper === item.url ? "selected" : ""}`}
                        onClick={() => handleSelectWallpaper(item.url)}
                      >
                        <div
                          className="thumb-img"
                          style={{ backgroundImage: `url(${item.url})` }}
                        >
                          {currentWallpaper === item.url && (
                            <div className="check-badge">
                              <i className="ri-check-line" />
                            </div>
                          )}
                        </div>
                        <span className="thumb-name">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DISPLAYS TAB */}
            {activeTab === "displays" && (
              <div className="tab-pane displays-pane">
                {/* Built-in Display Hero */}
                <div className="display-hero-container">
                  <div className="display-hero-graphic">
                    <div className="macbook-screen">
                      <div
                        className="macbook-screen-bg"
                        style={{ backgroundImage: `url(${currentWallpaper})` }}
                      />
                    </div>
                    <div className="macbook-base" />
                  </div>
                  <span className="display-hero-title">Built-in Display</span>
                </div>

                {/* Controls Group */}
                <div className="mac-card-group">
                  <SliderSetting
                    id="brightness-slider"
                    icon="ri-sun-line"
                    label="Brightness"
                    info="Adjust screen brightness without altering display hardware."
                    min={50}
                    max={100}
                    value={brightness}
                    onChange={handleBrightness}
                    startLabel="Dim"
                    endLabel="Crisp"
                    stateLabel={describeBrightness(brightness)}
                  />

                  <Toggle
                    icon="ri-focus-2-line"
                    label="Focus Mode"
                    info="Hides dock & extra elements for distraction-free work."
                    value={focusMode}
                    onChange={handleFocusMode}
                  />
                </div>
              </div>
            )}

            {/* BATTERY TAB */}
            {activeTab === "battery" && (
              <div className="tab-pane battery-pane">
                <div className="battery-status-header">
                  <div className="battery-header-text">
                    <h3>Battery</h3>
                    <span className="battery-charging-status">
                      <i className={batteryState.charging ? "ri-battery-2-charge-line" : "ri-battery-line"} />{" "}
                      {batteryState.charging ? `Charging: ${batteryState.level}%` : `On Battery: ${batteryState.level}%`}
                    </span>
                  </div>
                </div>

                <div className="mac-card-group">
                  <div className="setting-row">
                    <span className="row-label-text">Low Power Mode</span>
                    <select
                      className="mac-select"
                      value={lowPowerMode}
                      onChange={(e) => handleLowPowerMode(e.target.value)}
                    >
                      <option value="Never">Never</option>
                      <option value="Always">Always</option>
                      <option value="On Battery Only">On Battery Only</option>
                    </select>
                  </div>
                </div>

                <div className="mac-card-group">
                  <div className="setting-row">
                    <span className="row-label-text">Battery Health</span>
                    <div className="row-right-group">
                      <span className="status-val-text">Normal</span>
                      <button
                        className="info-btn"
                        onClick={() => setBatteryHealthModalOpen(true)}
                        aria-label="Battery Health Details"
                      >
                        <i className="ri-information-line" />
                      </button>
                    </div>
                  </div>

                  <div className="setting-row">
                    <span className="row-label-text">Charging</span>
                    <div className="row-right-group">
                      <button
                        className="info-btn"
                        onClick={() => setChargingModalOpen(true)}
                        aria-label="Charging Details"
                      >
                        <i className="ri-information-line" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SOUND TAB */}
            {activeTab === "sound" && (
              <div className="tab-pane">
                <div className="pane-hero">
                  <div className="hero-badge" style={{ backgroundColor: "#ff2d55" }}>
                    <i className="ri-volume-up-fill" />
                  </div>
                  <h3>Sound & Audio</h3>
                  <p>Configure macOS system UI audio feedback and volume output.</p>
                </div>

                <div className="mac-card-group">
                  <Toggle
                    icon="ri-volume-up-line"
                    label="System Sound Effects"
                    info="Play sound effects for window operations and system actions."
                    value={sound}
                    onChange={handleSound}
                  />

                  <SliderSetting
                    id="sound-slider"
                    icon="ri-sound-module-line"
                    label="Master Volume"
                    info="Control output volume level for system UI sound effects."
                    min={0}
                    max={100}
                    value={soundLevel}
                    disabled={!sound}
                    onChange={handleSoundLevel}
                    startLabel="Silent"
                    endLabel="Full"
                    stateLabel={sound ? describeSoundLevel(soundLevel) : "Disabled"}
                  />
                </div>
              </div>
            )}

            {/* APPEARANCE & DOCK TAB */}
            {activeTab === "appearance" && (
              <div className="tab-pane">
                <div className="pane-hero">
                  <div className="hero-badge" style={{ backgroundColor: "#5856d6" }}>
                    <i className="ri-layout-bottom-line" />
                  </div>
                  <h3>Appearance & Dock</h3>
                  <p>Adjust floating macOS Dock dimensions, icon scaling, and layout.</p>
                </div>

                <div className="mac-card-group">
                  <SliderSetting
                    id="dock-size-slider"
                    icon="ri-layout-bottom-line"
                    label="Dock Scale & Spacing"
                    info="Scale dock height, icon dimensions, and hit target gaps."
                    min={70}
                    max={140}
                    value={dockSize}
                    onChange={handleDockSize}
                    startLabel="Compact"
                    endLabel="Large"
                    stateLabel={describeDockSize(dockSize)}
                  />
                </div>
              </div>
            )}

            {/* PRIVACY & LOCK SCREEN TAB */}
            {activeTab === "privacy" && (
              <div className="tab-pane">
                <div className="pane-hero">
                  <div className="hero-badge" style={{ backgroundColor: "#8e8e93" }}>
                    <i className="ri-lock-line" />
                  </div>
                  <h3>Lock Screen & Security</h3>
                  <p>Configure automatic tab behavior upon unlocking your session.</p>
                </div>

                <div className="mac-card-group">
                  <Toggle
                    icon="ri-lock-unlock-line"
                    label="Close Tabs After Unlock"
                    info="Open apps close automatically when unlocking device."
                    value={autoCloseAfterUnlock}
                    onChange={handleAutoClose}
                  />
                </div>
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === "about" && (
              <div className="tab-pane">
                <div className="pane-hero">
                  <div className="hero-badge" style={{ backgroundColor: "#ff9500" }}>
                    <i className="ri-information-line" />
                  </div>
                  <h3>About ManOS</h3>
                  <p>macOS Sequoia & Tahoe interactive portfolio simulator.</p>
                </div>

                <div className="mac-card-group about-card-group">
                  <div className="about-info-row">
                    <span className="info-label">Version</span>
                    <span className="info-val">ManOS v1.0.69</span>
                  </div>
                  <div className="about-info-row">
                    <span className="info-label">Developer</span>
                    <span className="info-val">Mannat Gupta</span>
                  </div>
                  <div className="about-info-row">
                    <span className="info-label">Tech Stack</span>
                    <span className="info-val">React 18, Vite, SCSS, RemixIcon</span>
                  </div>
                </div>

                <div className="reset-block">
                  <button className="reset-btn" onClick={() => setShowResetConfirm(true)}>
                    <i className="ri-restart-line" /> Reset Desktop Layout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Battery Health Modal */}
        {batteryHealthModalOpen && (
          <div
            className="confirmation-overlay"
            onClick={() => setBatteryHealthModalOpen(false)}
          >
            <div
              className="confirmation-dialog mac-sheet-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sheet-section">
                <div className="sheet-row">
                  <span className="sheet-title">Battery Condition</span>
                  <span className="sheet-val">Normal</span>
                </div>
                <p className="sheet-desc">
                  Mac batteries, like all rechargeable batteries, are consumable
                  components that become less effective as they age.
                </p>
              </div>

              <div className="sheet-section">
                <div className="sheet-row">
                  <span className="sheet-title">Maximum Capacity</span>
                  <span className="sheet-val">100%</span>
                </div>
                <p className="sheet-desc">
                  This is a measure of battery capacity relative to when it was new. Lower
                  capacity may result in fewer hours of usage between charges.
                </p>
              </div>

              <div className="sheet-footer">
                <button
                  className="confirm-cancel"
                  onClick={() => {
                    window.open("https://support.apple.com/en-us/101575", "_blank")
                  }}
                >
                  Learn More...
                </button>
                <button
                  className="confirm-blue"
                  onClick={() => setBatteryHealthModalOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Optimized Charging Modal */}
        {chargingModalOpen && (
          <div
            className="confirmation-overlay"
            onClick={() => setChargingModalOpen(false)}
          >
            <div
              className="confirmation-dialog mac-sheet-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sheet-section">
                <div className="sheet-row flex-col gap-2">
                  <div className="flex-between">
                    <span className="sheet-title">Charge Limit</span>
                    <span className="sheet-val">{chargeLimit}%</span>
                  </div>
                  <input
                    type="range"
                    min={80}
                    max={100}
                    step={5}
                    value={chargeLimit}
                    style={{ "--slider-fill": `${((chargeLimit - 80) / 20) * 100}%` }}
                    onChange={(e) => setChargeLimit(Number(e.target.value))}
                    className="mac-modal-slider"
                  />
                  <div className="slider-ticks">
                    <span>80%</span>
                    <span>85%</span>
                    <span>90%</span>
                    <span>95%</span>
                    <span>100%</span>
                  </div>
                  <p className="sheet-desc">
                    Your Mac will charge to {chargeLimit}% limit.
                  </p>
                </div>
              </div>

              <div className="sheet-section">
                <div className="flex-between align-center">
                  <span className="sheet-title">Optimised Battery Charging</span>
                  <label className="switch switch-sm">
                    <input
                      type="checkbox"
                      checked={optimizedCharging}
                      onChange={(e) => setOptimizedCharging(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <p className="sheet-desc">
                  To reduce battery ageing, your Mac learns from your daily charging routine
                  so it can wait to finish charging past {chargeLimit}% until you need to use it on
                  battery.
                </p>
              </div>

              <div className="sheet-footer">
                <button
                  className="confirm-cancel"
                  onClick={() => {
                    window.open("https://support.apple.com/en-us/HT210512", "_blank")
                  }}
                >
                  Learn More...
                </button>
                <button
                  className="confirm-blue"
                  onClick={() => setChargingModalOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {showResetConfirm && (
          <div
            className="confirmation-overlay"
            onClick={() => setShowResetConfirm(false)}
          >
            <div
              className="confirmation-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Reset Desktop Layout?</h3>
              <p>
                This will close all open windows and reset the desktop to its
                default state.
              </p>
              <div className="confirmation-buttons">
                <button
                  className="confirm-cancel"
                  onClick={() => setShowResetConfirm(false)}
                >
                  Cancel
                </button>
                <button className="confirm-reset" onClick={handleResetConfirm}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MacWindow>
  )
}

function Toggle({ icon, label, info, value, onChange }) {
  return (
    <div className="setting-row">
      <LabelWithInfo icon={icon} label={label} info={info} />

      <label className="switch">
        <input
          type="checkbox"
          checked={value}
          onChange={() => onChange(!value)}
        />
        <span className="slider"></span>
      </label>
    </div>
  )
}

function SliderSetting({
  id,
  icon,
  label,
  info,
  min,
  max,
  value,
  disabled = false,
  onChange,
  startLabel,
  endLabel,
  stateLabel,
}) {
  const level = Math.round(((value - min) / (max - min)) * 100)

  return (
    <div className={`slider-row ${disabled ? "is-disabled" : ""}`}>
      <div className="slider-row-main">
        <LabelWithInfo htmlFor={id} icon={icon} label={label} info={info} />
        <span className="slider-value">{value}%</span>
      </div>

      <div className="slider-stack">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          value={value}
          style={{ "--slider-fill": `${level}%` }}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
        />

        <div className="slider-meta">
          <span>{startLabel}</span>
          <span>{endLabel}</span>
        </div>
      </div>
    </div>
  )
}

function LabelWithInfo({ icon, label, info, htmlFor }) {
  const content = (
    <>
      {icon && <i className={`row-icon ${icon}`} />}
      <span className="label-text">{label}</span>
      <span className="info" tabIndex={0} aria-label={info}>
        <span className="info-mark" aria-hidden="true">
          i
        </span>
        <span className="tip">{info}</span>
      </span>
    </>
  )

  if (htmlFor) {
    return (
      <label className="label" htmlFor={htmlFor}>
        {content}
      </label>
    )
  }

  return <div className="label">{content}</div>
}
