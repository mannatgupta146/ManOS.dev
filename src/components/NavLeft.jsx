import React, { useState, useEffect } from "react"
import "./NavLeft.scss"

const NavLeft = () => {
  const [showAbout, setShowAbout] = useState(false)
  const [showManOS, setShowManOS] = useState(false)
  const [showConnect, setShowConnect] = useState(false)

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

  const closeAll = () => {
    setShowAbout(false)
    setShowManOS(false)
    setShowConnect(false)
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

        <div className="connect-wrapper">
          <button
            className="menu-item"
            onClick={() => setShowConnect(!showConnect)}
          >
            Connect
            <span className={`arrow ${showConnect ? "open" : ""}`}>▲</span>
          </button>

          {showConnect && (
            <div className="connect-dropdown">
              <a href="https://instagram.com/mannat_1411" target="_blank">
                Instagram
              </a>
              <a href="https://x.com/MannatGupta146" target="_blank">
                X (Twitter)
              </a>
              <a
                href="https://www.linkedin.com/in/mannatgupta146/"
                target="_blank"
              >
                LinkedIn
              </a>
              <a href="https://github.com/mannatgupta146" target="_blank">
                GitHub
              </a>
            </div>
          )}
        </div>
      </div>

      {showAbout && (
        <div className="overlay" onClick={closeAll}>
          <div className="popover" onClick={(e) => e.stopPropagation()}>
            <img src="/icons/apple.svg" alt="Apple" />

            <p className="manos-title">ManOS v1.0.69</p>

            <div className="manos-info">
              <span className="msg green">{display[0]}</span>
              <span className="msg">{display[1]}</span>
              <span className="msg">{display[2]}</span>
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
    </>
  )
}

export default NavLeft
