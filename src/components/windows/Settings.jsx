import React, { useState } from "react"
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

  const [focusMode, setFocusMode] = useState(initialSettings.focusMode)
  const [sound, setSound] = useState(initialSettings.sound)
  const [soundLevel, setSoundLevel] = useState(initialSettings.soundLevel)
  const [autoCloseAfterUnlock, setAutoCloseAfterUnlock] = useState(
    initialSettings.autoCloseAfterUnlock,
  )
  const [brightness, setBrightness] = useState(initialSettings.brightness)
  const [dockSize, setDockSize] = useState(initialSettings.dockSize)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

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

  const [activeTab, setActiveTab] = useState("general")
  const [searchQuery, setSearchQuery] = useState("")

  const sidebarItems = [
    { id: "general", name: "General & Desktop", icon: "ri-macbook-line", bg: "#007aff" },
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
              <i className="ri-user-smile-fill" />
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
            {/* GENERAL TAB */}
            {activeTab === "general" && (
              <div className="tab-pane">
                <div className="pane-hero">
                  <div className="hero-badge" style={{ backgroundColor: "#007aff" }}>
                    <i className="ri-macbook-line" />
                  </div>
                  <h3>General & Desktop</h3>
                  <p>Manage workspace focus, display brightness, and desktop behavior.</p>
                </div>

                <div className="mac-card-group">
                  <Toggle
                    icon="ri-focus-2-line"
                    label="Focus Mode"
                    info="Hides dock & extra elements for distraction-free work."
                    value={focusMode}
                    onChange={handleFocusMode}
                  />

                  <SliderSetting
                    id="brightness-slider"
                    icon="ri-sun-line"
                    label="Desktop Brightness"
                    info="Adjust screen brightness without altering display hardware."
                    min={50}
                    max={100}
                    value={brightness}
                    onChange={handleBrightness}
                    startLabel="Dim"
                    endLabel="Bright"
                    stateLabel={describeBrightness(brightness)}
                  />
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
          <span>{stateLabel}</span>
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
