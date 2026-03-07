import React, { useState, useEffect, useRef } from "react"
import "./Spotlight.scss"

const Spotlight = ({ isOpen, onClose, apps, openApp }) => {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  const appsList = [
    {
      id: "terminal",
      name: "Terminal",
      icon: "ri-terminal-box-line",
      type: "app",
    },
    { id: "calendar", name: "Calendar", icon: "ri-calendar-line", type: "app" },
    { id: "mail", name: "Mail", icon: "ri-mail-line", type: "app" },
    { id: "github", name: "Github", icon: "ri-github-fill", type: "app" },
    { id: "resume", name: "Resume", icon: "ri-file-pdf-line", type: "app" },
    { id: "notes", name: "Notes", icon: "ri-sticky-note-line", type: "app" },
    { id: "code", name: "Code Editor", icon: "ri-code-line", type: "app" },
    { id: "spotify", name: "Spotify", icon: "ri-music-2-line", type: "app" },
    { id: "camera", name: "Camera", icon: "ri-camera-line", type: "app" },
    { id: "gallery", name: "Gallery", icon: "ri-image-line", type: "app" },
    {
      id: "settings",
      name: "Settings",
      icon: "ri-settings-3-line",
      type: "app",
    },
  ]

  const commands = [
    {
      id: "lock",
      name: "Lock Screen",
      icon: "ri-lock-line",
      type: "cmd",
      action: "lock",
    },
    {
      id: "wallpaper",
      name: "Change Wallpaper",
      icon: "ri-image-line",
      type: "cmd",
      action: "wallpaper",
    },
    {
      id: "focus",
      name: "Toggle Focus Mode",
      icon: "ri-focus-2-line",
      type: "cmd",
      action: "focus",
    },
    {
      id: "refresh",
      name: "Refresh Desktop",
      icon: "ri-refresh-line",
      type: "cmd",
      action: "refresh",
    },
    {
      id: "close-all",
      name: "Close All Windows",
      icon: "ri-window-close-line",
      type: "cmd",
      action: "close-all",
    },
  ]

  const allItems = [...appsList, ...commands]

  const filtered = allItems.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.id.toLowerCase().includes(query.toLowerCase()),
  )

  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  const handleSelect = (item) => {
    if (item.type === "app") {
      openApp(item.id)
    } else if (item.type === "cmd") {
      handleCommand(item.action)
    }
    onClose()
  }

  const handleCommand = (action) => {
    switch (action) {
      case "lock":
        window.dispatchEvent(
          new CustomEvent("spotlightAction", { detail: "lock" }),
        )
        break
      case "wallpaper":
        window.dispatchEvent(
          new CustomEvent("spotlightAction", { detail: "wallpaper" }),
        )
        break
      case "focus":
        const saved = JSON.parse(localStorage.getItem("ui-settings") || "{}")
        const newVal = !saved.focusMode
        const updated = { ...saved, focusMode: newVal }
        localStorage.setItem("ui-settings", JSON.stringify(updated))
        document.body.classList.toggle("focus-mode", newVal)
        window.dispatchEvent(new Event("settingsUpdated"))
        break
      case "refresh":
        document.body.classList.add("refresh-anim")
        setTimeout(() => document.body.classList.remove("refresh-anim"), 800)
        break
      case "close-all":
        window.dispatchEvent(
          new CustomEvent("spotlightAction", { detail: "close-all" }),
        )
        break
      default:
        break
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filtered.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex])
      }
    } else if (e.key === "Escape") {
      e.preventDefault()
      onClose()
    }
  }

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="spotlight-overlay" onClick={onClose}>
      <div className="spotlight-panel" onClick={(e) => e.stopPropagation()}>
        <div className="spotlight-input-wrapper">
          <i className="ri-search-line spotlight-icon"></i>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search apps or commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="spotlight-input"
          />
          <button
            type="button"
            className="spotlight-close"
            aria-label="Close Spotlight"
            onClick={onClose}
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        {filtered.length > 0 ? (
          <div className="spotlight-results">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className={`spotlight-result ${index === selectedIndex ? "active" : ""}`}
                onClick={() => handleSelect(item)}
              >
                <div className="result-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="result-content">
                  <span className="result-name">{item.name}</span>
                  <span className="result-type">
                    {item.type === "app" ? "App" : "Command"}
                  </span>
                </div>
                {index === selectedIndex && (
                  <div className="result-highlight"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="spotlight-empty">
            <i className="ri-inbox-line"></i>
            <p>No results for "{query}"</p>
          </div>
        )}

        <div className="spotlight-footer">
          <span className="kbd">⏎</span> Select
          <span className="kbd">↑↓</span> Navigate
          <span className="kbd">Esc</span> Close
        </div>
      </div>
    </div>
  )
}

export default Spotlight
