import { useState } from "react"
import "./settings.scss"

const getSavedSettings = () => {
  const saved = JSON.parse(localStorage.getItem("ui-settings") || "{}")
  return {
    focusMode: saved.focusMode ?? false,
    sound: saved.sound ?? true,
    autoCloseAfterUnlock: saved.autoCloseAfterUnlock ?? false,
    brightness: saved.brightness ?? 100,
  }
}

export default function Settings({ onClose, onResetDesktop }) {
  const initialSettings = getSavedSettings()

  const [focusMode, setFocusMode] = useState(initialSettings.focusMode)
  const [sound, setSound] = useState(initialSettings.sound)
  const [autoCloseAfterUnlock, setAutoCloseAfterUnlock] = useState(
    initialSettings.autoCloseAfterUnlock,
  )
  const [brightness, setBrightness] = useState(initialSettings.brightness)
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

    // Notify desktop of changes
    window.dispatchEvent(new Event("settingsUpdated"))
  }

  const handleFocusMode = (val) => {
    setFocusMode(val)
    saveSetting("focusMode", val)
  }

  const handleSound = (val) => {
    setSound(val)
    saveSetting("sound", val)
  }

  const handleAutoClose = (val) => {
    setAutoCloseAfterUnlock(val)
    saveSetting("autoCloseAfterUnlock", val)
  }

  const handleBrightness = (val) => {
    setBrightness(val)
    saveSetting("brightness", val)
  }

  const handleResetConfirm = () => {
    setShowResetConfirm(false)
    if (onResetDesktop) {
      onResetDesktop()
    }
  }

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Workspace Settings</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <Toggle
          label="Focus Mode"
          info="Hides dock & distractions for deep work."
          value={focusMode}
          onChange={handleFocusMode}
        />

        <Toggle
          label="System Sounds"
          info="Play sounds when windows open & close."
          value={sound}
          onChange={handleSound}
        />

        <Toggle
          label="Close Tabs After Unlock"
          info="Open apps close automatically after unlocking."
          value={autoCloseAfterUnlock}
          onChange={handleAutoClose}
        />

        <div className="slider-row">
          <label htmlFor="brightness-slider">Brightness</label>
          <div className="brightness-control">
            <input
              id="brightness-slider"
              type="range"
              min="60"
              max="100"
              value={brightness}
              onChange={(e) => handleBrightness(Number(e.target.value))}
            />
            <span className="brightness-value">{brightness}%</span>
          </div>
        </div>

        <button className="reset-btn" onClick={() => setShowResetConfirm(true)}>
          Reset Desktop Layout
        </button>

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
    </div>
  )
}

function Toggle({ label, info, value, onChange }) {
  return (
    <div className="setting-row">
      <div className="label">
        {label}
        <span className="info">
          i<span className="tip">{info}</span>
        </span>
      </div>

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
