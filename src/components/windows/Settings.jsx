import { useState, useEffect } from "react";
import "./settings.scss";

export default function Settings({ onClose, onResetDesktop }) {

  const [focusMode, setFocusMode] = useState(false);
  const [sound, setSound] = useState(true);
  const [autoCloseAfterUnlock, setAutoCloseAfterUnlock] = useState(false);
  const [brightness, setBrightness] = useState(100);

  // LOAD SETTINGS
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ui-settings"));
    if (saved) {
      setFocusMode(saved.focusMode);
      setSound(saved.sound);
      setAutoCloseAfterUnlock(saved.autoCloseAfterUnlock);
      setBrightness(saved.brightness ?? 100);
    }
  }, []);

  // APPLY + SAVE
  useEffect(() => {
    const settings = {
      focusMode,
      sound,
      autoCloseAfterUnlock,
      brightness
    };

    localStorage.setItem("ui-settings", JSON.stringify(settings));

    document.body.classList.toggle("focus-mode", focusMode);

    document.documentElement.style.setProperty(
      "--brightness",
      brightness + "%"
    );

  }, [focusMode, sound, autoCloseAfterUnlock, brightness]);

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e)=>e.stopPropagation()}>

        <h2>Workspace Settings</h2>

        <Toggle
          label="Focus Mode"
          info="Hide dock for distraction-free workspace."
          value={focusMode}
          onChange={setFocusMode}
        />

        <Toggle
          label="System Sounds"
          info="Play sounds when windows open or close."
          value={sound}
          onChange={setSound}
        />

        <Toggle
          label="Close Tabs After Unlock"
          info="Open apps close automatically after unlocking."
          value={autoCloseAfterUnlock}
          onChange={setAutoCloseAfterUnlock}
        />

        <div className="slider-row">
          <span>Brightness</span>
          <input
            type="range"
            min="60"
            max="100"
            value={brightness}
            onChange={(e)=>setBrightness(e.target.value)}
          />
        </div>

        <button
          className="reset-btn"
          onClick={onResetDesktop}
        >
          Reset Desktop Layout
        </button>

      </div>
    </div>
  );
}

function Toggle({ label, info, value, onChange }) {
  return (
    <div className="setting-row">
      <div className="label">
        {label}
        <span className="info">
          i
          <span className="tip">{info}</span>
        </span>
      </div>

      <label className="switch">
        <input type="checkbox" checked={value} onChange={()=>onChange(!value)} />
        <span className="slider"></span>
      </label>
    </div>
  );
}