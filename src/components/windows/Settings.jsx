import { useState, useEffect } from "react";
import "./settings.scss";

export default function Settings({ onClose }) {
  const [darkMode, setDarkMode] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [sound, setSound] = useState(true);
  const [accent, setAccent] = useState("#34c759");

  // load saved settings
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ui-settings"));
    if (saved) {
      setDarkMode(saved.darkMode);
      setFocusMode(saved.focusMode);
      setSound(saved.sound);
      setAccent(saved.accent);
    }
  }, []);

  // apply + save settings
  useEffect(() => {
    const settings = { darkMode, focusMode, sound, accent };
    localStorage.setItem("ui-settings", JSON.stringify(settings));

    document.body.classList.toggle("dark", darkMode);
    document.body.classList.toggle("focus", focusMode);
    document.documentElement.style.setProperty("--accent", accent);
  }, [darkMode, focusMode, sound, accent]);

  const resetSettings = () => {
    setDarkMode(false);
    setFocusMode(false);
    setSound(true);
    setAccent("#34c759");
  };

  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        <div className="settings-header">
          <h2>Settings</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="settings-section">
          <label>
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </label>

          <label>
            <span>Focus Mode</span>
            <input
              type="checkbox"
              checked={focusMode}
              onChange={() => setFocusMode(!focusMode)}
            />
          </label>

          <label>
            <span>System Sounds</span>
            <input
              type="checkbox"
              checked={sound}
              onChange={() => setSound(!sound)}
            />
          </label>
        </div>

        <div className="settings-section">
          <p className="section-title">Accent Color</p>
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
          />
        </div>

        <div className="settings-footer">
          <button className="reset-btn" onClick={resetSettings}>
            Reset Defaults
          </button>
        </div>
      </div>
    </div>
  );
}