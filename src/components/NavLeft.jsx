import React, { useState, useEffect, useRef } from "react"
import "./NavLeft.scss"

const NavLeft = () => {
  const [showAbout, setShowAbout] = useState(false)
  const [showManOS, setShowManOS] = useState(false)
  const [showConnect, setShowConnect] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const messages = [
    "System initialized successfully.",
    "Admin: Mannat Gupta",
    "Mode: Portfolio Environment",
  ]

  const totalChars = messages.reduce((sum, m) => sum + m.length, 0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!showAbout) {
      setProgress(0)
      return
    }

    const interval = setInterval(() => {
      setProgress((p) => (p >= totalChars ? p : p + 1))
    }, 50)

    return () => clearInterval(interval)
  }, [showAbout])

  const display = []
  let remaining = progress

  for (const msg of messages) {
    if (remaining <= 0) {
      display.push("")
    } else if (remaining >= msg.length) {
      display.push(msg)
      remaining -= msg.length
    } else {
      display.push(msg.slice(0, remaining))
      remaining = 0
    }
  }

  const connectRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (connectRef.current && !connectRef.current.contains(e.target)) {
        setShowConnect(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const closeAll = () => {
    setShowAbout(false)
    setShowManOS(false)
    setShowConnect(false)
    setShowHelp(false)
  }

  const openApp = (app) => {
    closeAll()
    window.dispatchEvent(new CustomEvent("spotlightAction", { detail: app }))
  }

  return (
    <>
      <div className="left">
        <button
          className="apple-icon"
          onClick={() => {
            closeAll()
            setShowManOS(true)
          }}
        >
          <img src="/icons/apple.svg" alt="Apple" />
        </button>

        <button className="name-item">Mannat Gupta</button>

        <button
          className="menu-item"
          onClick={() => {
            closeAll()
            setShowAbout(true)
          }}
        >
          About
        </button>

        <div className="connect-wrapper" ref={connectRef}>
          <button
            className={`menu-item ${showConnect ? "active" : ""}`}
            onClick={() => setShowConnect(!showConnect)}
          >
            Connect
            <span className={`arrow ${showConnect ? "open" : ""}`}>▼</span>
          </button>

          {showConnect && (
            <div className="connect-dropdown">
              <a
                href="https://instagram.com/mannat_1411"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://x.com/MannatGupta146"
                target="_blank"
                rel="noopener noreferrer"
              >
                X (Twitter)
              </a>
              <a
                href="https://www.linkedin.com/in/mannatgupta146/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/mannatgupta146"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          )}
        </div>

        <button
          className="menu-item"
          onClick={() => {
            closeAll()
            setShowHelp(true)
          }}
        >
          Help
        </button>
      </div>

      {showAbout && (
        <div className="overlay" onClick={closeAll}>
          <div className="popover" onClick={(e) => e.stopPropagation()}>
            <img src="/icons/apple.svg" alt="Apple" />

            <p className="manos-title">ManOS v1.0.69</p>

            <div className="manos-info">
              <span className="msg green">{display[0]}</span>
              <span className="msg">{display[1]}</span>
              <span className="msg">
                {display[2]}
                {progress < totalChars && <span className="cursor">|</span>}
              </span>
            </div>

            {progress < totalChars ? (
              <div className="about-progress">
                <div className="progress-header">
                  <span className="progress-label">Loading system...</span>
                  <span className="percent">
                    {Math.floor((progress / totalChars) * 100)}%
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="bar"
                    style={{ width: `${(progress / totalChars) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="manos-status">You are now inside ManOS.</p>
            )}
          </div>
        </div>
      )}

      {showManOS && (
        <div className="overlay" onClick={closeAll}>
          <div className="apple-only" onClick={(e) => e.stopPropagation()}>
            <img src="/icons/apple.svg" alt="Apple" />
            <span className="apple-label">ManOS v1.0</span>
          </div>
        </div>
      )}

      {showHelp && (
        <div className="overlay" onClick={closeAll}>
          <div className="help-card" onClick={(e) => e.stopPropagation()}>
            <div className="help-header">
              <i className="ri-questionnaire-line" />
              <h3>Welcome to ManOS</h3>
            </div>

            <p className="help-desc">
              This is a macOS-inspired portfolio built by{" "}
              <strong>Mannat Gupta</strong>. Explore apps, run terminal
              commands, and discover hidden features — it's all interactive.
            </p>

            <div className="help-actions">
              <button
                className="help-btn cli"
                onClick={() => openApp("terminal")}
              >
                <i className="ri-terminal-box-line" />
                <div>
                  <span className="btn-title">Open Terminal</span>
                  <span className="btn-sub">Try cool commands</span>
                </div>
              </button>

              <button
                className="help-btn resume"
                onClick={() => openApp("resume")}
              >
                <i className="ri-file-text-line" />
                <div>
                  <span className="btn-title">View Resume</span>
                  <span className="btn-sub">Know about me</span>
                </div>
              </button>
            </div>

            <div className="help-tips">
              <p className="help-tip">
                <i className="ri-keyboard-line" /> Press <kbd>Ctrl</kbd> +{" "}
                <kbd>K</kbd> to open Spotlight search
              </p>
              <p className="help-tip">
                <i className="ri-mouse-line" /> Right-click on the desktop to
                open quick actions
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NavLeft
