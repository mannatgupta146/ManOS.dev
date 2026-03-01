import React, { useState, useEffect } from "react"
import Dock from "../Dock"
import DesktopMenu from "../DesktopMenu"
import Spotlight from "../Spotlight"

import Camera from "./Camera"
import Gallery from "./Gallery"
import Cli from "./Cli"
import Calendar from "./Calendar"
import Code from "./CodeEditor"
import Github from "./Github"
import Mail from "./Mail"
import Note from "./Note"
import Pdf from "./Pdf"
import Spotify from "./Spotify"
import LockScreen from "../LockScreen"
import Settings from "./Settings"

import { playSound } from "../../utils/sound.js"

export default function Desktop() {
  const STORAGE_KEY = "desktop_layout"
  const WALL_KEY = "desktop_wallpaper"

  /* ---------------- Z INDEX ---------------- */

  const [zMap, setZMap] = useState({})
  const [topZ, setTopZ] = useState(20)
  const [locked, setLocked] = useState(false)

  const [toast, setToast] = useState(null)
  const [spotlightOpen, setSpotlightOpen] = useState(false)

  useEffect(() => {
    const applySettings = () => {
      const saved = JSON.parse(localStorage.getItem("ui-settings") || "{}")

      document.body.classList.toggle("focus-mode", saved.focusMode)

      const brightness = saved.brightness ?? 100
      document.documentElement.style.setProperty(
        "--brightness",
        brightness + "%",
      )
    }

    applySettings()

    window.addEventListener("settingsUpdated", applySettings)
    return () => window.removeEventListener("settingsUpdated", applySettings)
  }, [])

  /* Keyboard Shortcuts */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K for Spotlight
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSpotlightOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  /* Spotlight Actions */
  useEffect(() => {
    const handleSpotlightAction = (e) => {
      const action = e.detail
      handleMenuAction(action)
    }

    window.addEventListener("spotlightAction", handleSpotlightAction)
    return () =>
      window.removeEventListener("spotlightAction", handleSpotlightAction)
  }, [])

  const showToast = (msg) => {
    setToast(msg)
    playSound("notify")
    setTimeout(() => setToast(null), 2400)
  }

  const lockScreen = () => {
    setLocked(true)
  }

  const unlockScreen = () => {
    const settings = JSON.parse(localStorage.getItem("ui-settings") || "{}")

    if (settings.autoCloseAfterUnlock) {
      const closed = {}
      Object.keys(apps).forEach((a) => (closed[a] = "closed"))
      setApps(closed)
    }

    setLocked(false)
  }

  const focusApp = (app) => {
    setTopZ((z) => {
      const newZ = z + 1
      setZMap((prev) => ({ ...prev, [app]: newZ }))
      return newZ
    })
  }

  /* ---------------- RIGHT CLICK MENU ---------------- */

  const [menu, setMenu] = useState(null)

  const handleRightClick = (e) => {
    e.preventDefault()
    setMenu({ x: e.clientX, y: e.clientY })
  }

  const closeMenu = () => setMenu(null)

  /* ---------------- WALLPAPER SYSTEM ---------------- */

  const main = document.querySelector("main")

  const wallpapers = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1920",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1920",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1920",
  ]

  const applyWallpaper = (img) => {
    requestAnimationFrame(() => {
      const main = document.querySelector("main")
      if (!main) return

      main.style.backgroundImage = `url(${img})`
      main.style.backgroundSize = "cover"
      main.style.backgroundPosition = "center"
      main.style.backgroundRepeat = "no-repeat"
    })
  }

  const changeWallpaper = () => {
    const img = wallpapers[Math.floor(Math.random() * wallpapers.length)]

    applyWallpaper(img)
    localStorage.setItem(WALL_KEY, img)
  }
  // restore wallpaper
  useEffect(() => {
    const saved = localStorage.getItem(WALL_KEY)
    if (saved) applyWallpaper(saved)
  }, [])

  /* ---------------- MENU ACTIONS ---------------- */

  const handleMenuAction = (action) => {
    closeMenu()

    switch (action) {
      case "refresh":
        document.body.classList.add("refresh-anim")
        setTimeout(() => document.body.classList.remove("refresh-anim"), 800)
        break

      case "wallpaper":
        changeWallpaper()
        break

      case "new-note":
        openApp("notes")
        break

      case "new-camera":
        openApp("camera")
        break

      case "terminal":
        openApp("terminal")
        break

      case "show-desktop":
        Object.keys(apps).forEach(minimizeApp)
        break

      case "lock":
        lockScreen()
        break

      case "close-all":
        const openWindows = Object.values(apps).filter(
          (s) => s === "open" || s === "minimized",
        )

        if (openWindows.length === 0) {
          showToast("No tabs are open")
        } else {
          Object.keys(apps).forEach(closeApp)
          showToast("All tabs are closed")
        }
        break

      case "settings":
        openApp("settings")
        showToast("Settings opened ⚙️")
        break

      case "dock-toggle":
        document.body.classList.toggle("dock-hidden")
        break
    }
  }

  /* ---------------- LOAD SESSION ---------------- */

  const loadLayout = () => {
    if (!sessionStorage.getItem("manos-session")) {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(WALL_KEY) // reset wallpaper on new session
      return null
    }
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  }

  const [apps, setApps] = useState(
    loadLayout() || {
      terminal: "closed",
      calendar: "closed",
      mail: "closed",
      github: "closed",
      resume: "closed",
      notes: "closed",
      code: "closed",
      spotify: "closed",
      camera: "closed",
      gallery: "closed",
      settings: "closed",
    },
  )

  /* ---------------- APP STATE ---------------- */

  const openApp = (app) => {
    focusApp(app)
    setApps((prev) => ({ ...prev, [app]: "open" }))
    playSound("open")
  }

  const minimizeApp = (app) => {
    setApps((prev) => ({ ...prev, [app]: "minimized" }))
    playSound("minimize")
  }

  const closeApp = (app) => {
    setApps((prev) => ({ ...prev, [app]: "closed" }))
    playSound("close")
  }

  useEffect(() => {
    const handler = (e) => minimizeApp(e.detail)
    window.addEventListener("minimizeApp", handler)
    return () => window.removeEventListener("minimizeApp", handler)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps))
  }, [apps])

  const resetDesktop = () => {
    // Clear storage
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(WALL_KEY)
    localStorage.removeItem("ui-settings")

    // Reset wallpaper visually
    const main = document.querySelector("main")
    if (main) {
      main.style.backgroundImage = ""
      main.style.backgroundSize = ""
      main.style.backgroundPosition = ""
      main.style.backgroundRepeat = ""
    }

    // Reset body classes and styles
    document.body.classList.remove("focus-mode")
    document.documentElement.style.setProperty("--brightness", "100%")

    // Reset app states
    const initialApps = {
      terminal: "closed",
      calendar: "closed",
      mail: "closed",
      github: "closed",
      resume: "closed",
      notes: "closed",
      code: "closed",
      spotify: "closed",
      camera: "closed",
      gallery: "closed",
      settings: "closed",
    }

    setApps(initialApps)
    setZMap({})
    setTopZ(20)
    setMenu(null)

    showToast("Desktop layout reset ✨")
  }

  const renderApp = (Component, key) =>
    apps[key] !== "closed" && (
      <Component
        minimized={apps[key] === "minimized"}
        onClose={() => closeApp(key)}
        onMinimize={() => minimizeApp(key)}
        zIndex={zMap[key]}
        onFocus={() => focusApp(key)}
        onResetDesktop={key === "settings" ? resetDesktop : undefined}
      />
    )

  return (
    <div
      className={`desktop-area ${locked ? "locked" : ""}`}
      onContextMenu={!locked ? handleRightClick : null}
      onClick={!locked ? closeMenu : null}
    >
      {renderApp(Camera, "camera")}
      {renderApp(Gallery, "gallery")}
      {renderApp(Cli, "terminal")}
      {renderApp(Calendar, "calendar")}
      {renderApp(Note, "notes")}
      {renderApp(Mail, "mail")}
      {renderApp(Github, "github")}
      {renderApp(Pdf, "resume")}
      {renderApp(Spotify, "spotify")}
      {renderApp(Code, "code")}
      {renderApp(Settings, "settings")}

      {!locked && <Dock apps={apps} openApp={openApp} />}

      {menu && (
        <DesktopMenu x={menu.x} y={menu.y} onAction={handleMenuAction} />
      )}

      {locked && <LockScreen onUnlock={unlockScreen} />}
      {toast && (
        <div className="toast">
          <i className="ri-checkbox-circle-line"></i>
          {toast}
        </div>
      )}

      <Spotlight
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        apps={apps}
        openApp={openApp}
      />
    </div>
  )
}
