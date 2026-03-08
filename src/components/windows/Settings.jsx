import { useState } from "react"
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

export default function Settings({ onClose, onResetDesktop }) {
  const initialSettings = getSavedSettings()

  const [focusMode, setFocusMode] = useState(initialSettings.focusMode)
  const [sound, setSound] = useState(initialSettings.sound)
  const [soundLevel, setSoundLevel] = useState(initialSettings.soundLevel)
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
    // notifications removed – toastify not needed in settings
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
    // no toast notifications here anymore
  }

  const handleBrightness = (val) => {
    const clamped = Math.min(100, Math.max(50, val))
    setBrightness(clamped)
    saveSetting("brightness", clamped)
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

        <div className="settings-group">
          <Toggle
            label="Focus Mode"
            info="Hides dock & distractions for deep work."
            value={focusMode}
            onChange={handleFocusMode}
          />

          <Toggle
            label="Close Tabs After Unlock"
            info="Open apps close automatically after unlocking."
            value={autoCloseAfterUnlock}
            onChange={handleAutoClose}
          />

          <Toggle
            label="System Sounds"
            info="Play sounds when windows open & close."
            value={sound}
            onChange={handleSound}
          />

          <SliderSetting
            id="sound-slider"
            label="Sound Volume"
            info="Adjust the volume of system UI sounds from silent to full volume."
            min={0}
            max={100}
            value={soundLevel}
            disabled={!sound}
            onChange={handleSoundLevel}
            startLabel="Silent"
            endLabel="Full"
            stateLabel={sound ? describeSoundLevel(soundLevel) : "Disabled"}
          />

          <SliderSetting
            id="brightness-slider"
            label="Brightness"
            info="Control the desktop brightness without changing your device brightness."
            min={50}
            max={100}
            value={brightness}
            onChange={handleBrightness}
            startLabel="Dim"
            endLabel="Bright"
            stateLabel={describeBrightness(brightness)}
          />
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
      <LabelWithInfo label={label} info={info} />

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
        <LabelWithInfo htmlFor={id} label={label} info={info} />
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

function LabelWithInfo({ label, info, htmlFor }) {
  const content = (
    <>
      {label}
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
