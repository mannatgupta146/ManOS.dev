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

const APP_OPEN_SOUNDS = {
  terminal: "app-terminal",
  calendar: "app-calendar",
  mail: "app-mail",
  github: "app-github",
  resume: "app-resume",
  notes: "app-notes",
  code: "app-code",
  spotify: "app-spotify",
  camera: "app-camera",
  gallery: "app-gallery",
  settings: "app-settings",
}

export default function Desktop({ mobileMenuRequest = 0 }) {
  const STORAGE_KEY = "desktop_layout"
  const WALL_KEY = "desktop_wallpaper"
  const WALL_QUEUE_KEY = "desktop_wallpaper_queue"

  /* ---------------- Z INDEX ---------------- */

  const [zMap, setZMap] = useState({})
  const [topZ, setTopZ] = useState(20)
  const [locked, setLocked] = useState(false)

  const [spotlightOpen, setSpotlightOpen] = useState(false)

  const openSpotlight = (source = "button") => {
    setSpotlightOpen(true)
    playSound(source === "shortcut" ? "spotlight-shortcut" : "spotlight")
  }

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
        openSpotlight("shortcut")
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

    const handleSpotlightOpen = (e) => {
      openSpotlight(e.detail?.source)
    }

    window.addEventListener("spotlightAction", handleSpotlightAction)
    window.addEventListener("openSpotlight", handleSpotlightOpen)
    return () => {
      window.removeEventListener("spotlightAction", handleSpotlightAction)
      window.removeEventListener("openSpotlight", handleSpotlightOpen)
    }
  }, [])

  const lockScreen = () => {
    playSound("lock")
    setLocked(true)
    if (window.notify) {
      window.notify({
        title: "Screen",
        message: "Device locked",
        type: "info",
        duration: 3000,
      })
    }
  }

  const unlockScreen = () => {
    const settings = JSON.parse(localStorage.getItem("ui-settings") || "{}")

    if (settings.autoCloseAfterUnlock) {
      const closed = {}
      Object.keys(apps).forEach((a) => (closed[a] = "closed"))
      setApps(closed)
    }

    playSound("unlock")
    setLocked(false)
    if (window.notify) {
      window.notify({
        title: "Welcome back",
        message: "Device unlocked",
        type: "success",
        duration: 3000,
      })
    }
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

  const openMenuAt = (x, y, source = "context") => {
    playSound("menu")
    setMenu({ x, y, source })
  }

  const handleRightClick = (e) => {
    e.preventDefault()
    openMenuAt(e.clientX, e.clientY)
  }

  const closeMenu = () => setMenu(null)

  const handleDesktopClick = () => {
    closeMenu()
  }

  /* ---------------- WALLPAPER SYSTEM ---------------- */

  const main = document.querySelector("main")

  const wallpapers = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1920",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1920",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1920",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920",
    "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=1920",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1920",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920",
  ]

  const shuffleWallpapers = (items, currentWallpaper) => {
    const shuffled = [...items]

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1))
      ;[shuffled[index], shuffled[swapIndex]] = [
        shuffled[swapIndex],
        shuffled[index],
      ]
    }

    if (shuffled.length > 1 && shuffled[0] === currentWallpaper) {
      ;[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
    }

    return shuffled
  }

  const getNextWallpaper = () => {
    const currentWallpaper = localStorage.getItem(WALL_KEY)
    const savedQueue = JSON.parse(localStorage.getItem(WALL_QUEUE_KEY) || "[]")
    const validQueue = savedQueue.filter((item) => wallpapers.includes(item))

    let queue = validQueue.filter((item) => item !== currentWallpaper)

    if (queue.length === 0) {
      queue = shuffleWallpapers(wallpapers, currentWallpaper)
    }

    const nextWallpaper = queue[0] || wallpapers[0]
    localStorage.setItem(WALL_QUEUE_KEY, JSON.stringify(queue.slice(1)))

    return nextWallpaper
  }

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
    const img = getNextWallpaper()

    playSound("wallpaper")
    applyWallpaper(img)
    localStorage.setItem(WALL_KEY, img)
    if (window.notify) {
      window.notify({
        title: "Wallpaper",
        message: "Changed to a new wallpaper",
        type: "success",
        duration: 3000,
      })
    }
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
        playSound("refresh")
        document.body.classList.add("refresh-anim")
        setTimeout(() => document.body.classList.remove("refresh-anim"), 800)
        if (window.notify) {
          window.notify({
            title: "System",
            message: "Desktop refreshed",
            type: "success",
            duration: 3000,
          })
        }
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

      case "resume":
        openApp("resume")
        break

      case "show-desktop":
        playSound("show-desktop")
        Object.keys(apps).forEach(minimizeApp)
        if (window.notify) {
          window.notify({
            title: "Desktop",
            message: "All windows minimized",
            type: "info",
            duration: 3000,
          })
        }
        break

      case "lock":
        lockScreen()
        break

      case "close-all":
        const openWindows = Object.values(apps).filter(
          (s) => s === "open" || s === "minimized",
        )

        if (openWindows.length === 0) {
          playSound("empty")
          if (window.notify) {
            window.notify({
              title: "No tabs open",
              message: "There are no tabs to close.",
              type: "info",
              duration: 3000,
            })
          }
        } else {
          // Close everything cleanly
          setApps({
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
          })

          setZMap({})
          setTopZ(20)
          playSound("close-all")

          if (window.notify) {
            window.notify({
              title: "All tabs closed",
              message: "All tabs have been closed",
              type: "success",
              duration: 4000,
            })
          }
        }
        break

      case "settings":
        openApp("settings")
        break

      case "dock-toggle":
        playSound("dock-toggle")
        document.body.classList.toggle("dock-hidden")
        break
    }
  }

  useEffect(() => {
    if (!mobileMenuRequest || locked || window.innerWidth > 768) {
      return
    }

    if (menu?.source === "mobile-actions") {
      closeMenu()
      return
    }

    openMenuAt(mobileMenuRequest.x, mobileMenuRequest.y, "mobile-actions")
  }, [mobileMenuRequest, locked])

  /* ---------------- LOAD SESSION ---------------- */

  const loadLayout = () => {
    if (!sessionStorage.getItem("manos-session")) {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(WALL_KEY) // reset wallpaper on new session
      localStorage.removeItem(WALL_QUEUE_KEY)

      const savedSettings = JSON.parse(localStorage.getItem("ui-settings") || "{}")
      if (savedSettings.focusMode) {
        localStorage.setItem(
          "ui-settings",
          JSON.stringify({ ...savedSettings, focusMode: false }),
        )
      }

      document.body.classList.remove("focus-mode", "dock-hidden")
      return null
    }
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const layout = JSON.parse(saved)
      // ensure camera is always closed on reload to avoid leaving
      // the webcam running unintentionally
      if (layout.camera && layout.camera !== "closed") {
        layout.camera = "closed"
      }
      return layout
    }
    return null
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

  const openApp = (app, source = "system") => {
    focusApp(app)
    setApps((prev) => ({ ...prev, [app]: "open" }))
    playSound(source === "dock" ? "dock-open" : APP_OPEN_SOUNDS[app] || "open")
    if (window.notify) {
      const appNames = {
        terminal: "Terminal",
        calendar: "Calendar",
        mail: "Mail",
        github: "GitHub",
        resume: "Resume",
        notes: "Notes",
        code: "Code Editor",
        spotify: "Spotify",
        camera: "Camera",
        gallery: "Gallery",
        settings: "Settings",
      }
      window.notify({
        title: appNames[app] || app,
        message: "App opened",
        type: "success",
        duration: 3000,
      })
    }
  }

  const minimizeApp = (app, source = "system") => {
    setApps((prev) => ({ ...prev, [app]: "minimized" }))
    playSound(source === "dock" ? "dock-close" : "minimize")
  }

  const closeApp = (app, silent = false) => {
    const nextApps = { ...apps, [app]: "closed" }
    const remainingOpenApps = Object.values(nextApps).filter(
      (state) => state === "open" || state === "minimized",
    )

    setApps(nextApps)
    localStorage.removeItem(`window_${app}`)
    playSound("close")

    if (
      !silent &&
      app !== "settings" &&
      remainingOpenApps.length === 0 &&
      window.notify
    ) {
      window.notify({
        title: "All tabs closed",
        message: "There are no open tabs left.",
        type: "success",
        duration: 3200,
      })
    }
  }

  useEffect(() => {
    const handler = (e) => {
      if (typeof e.detail === "string") {
        minimizeApp(e.detail)
        return
      }

      minimizeApp(e.detail.app, e.detail.source)
    }

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
    localStorage.removeItem(WALL_QUEUE_KEY)
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

    playSound("close-all")
    if (window.notify) {
      window.notify({
        title: "All tabs closed",
        message: "All tabs have been closed.",
        type: "success",
        duration: 3200,
      })
    }
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
      onClick={!locked ? handleDesktopClick : null}
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
        <DesktopMenu
          x={menu.x}
          y={menu.y}
          onAction={handleMenuAction}
          onClose={closeMenu}
        />
      )}

      {locked && <LockScreen onUnlock={unlockScreen} />}

      <Spotlight
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        apps={apps}
        openApp={openApp}
      />
    </div>
  )
}
