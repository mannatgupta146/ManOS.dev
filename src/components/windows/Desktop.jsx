import React, { useState, useEffect } from "react"
import Dock from "../Dock"

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

export default function Desktop() {
  const STORAGE_KEY = "desktop_layout"


  const [zOrder, setZOrder] = useState({});
  const [topZ, setTopZ] = useState(10);

  const focusApp = (app) => {
  setTopZ((z) => {
    const newZ = z + 1;
    setZOrder(prev => ({ ...prev, [app]: newZ }));
    return newZ;
  });
};


  const loadLayout = () => {
    // if new session → reset
    if (!sessionStorage.getItem("manos-session")) {
      localStorage.removeItem(STORAGE_KEY)
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
    },
  )

  const openApp = (app) => {
    setApps((prev) => ({
      ...prev,
      [app]: "open",
    }))
  }

  const minimizeApp = (app) => {
    setApps((prev) => ({
      ...prev,
      [app]: "minimized",
    }))
  }

  const closeApp = (app) => {
    setApps((prev) => ({
      ...prev,
      [app]: "closed",
    }))
  }

  // 🔥 allows window to dispatch minimize event
  useEffect(() => {
    const handler = (e) => minimizeApp(e.detail)
    window.addEventListener("minimizeApp", handler)
    return () => window.removeEventListener("minimizeApp", handler)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps))
  }, [apps])

  return (
    <>
      {apps.camera !== "closed" && (
        <Camera
          minimized={apps.camera === "minimized"}
          onClose={() => closeApp("camera")}
          onMinimize={() => minimizeApp("camera")}
        />
      )}

      {apps.gallery !== "closed" && (
        <Gallery
          minimized={apps.gallery === "minimized"}
          onClose={() => closeApp("gallery")}
          onMinimize={() => minimizeApp("gallery")}
        />
      )}

      {apps.terminal !== "closed" && (
        <Cli
          minimized={apps.terminal === "minimized"}
          onClose={() => closeApp("terminal")}
          onMinimize={() => minimizeApp("terminal")}
        />
      )}

      {apps.calendar !== "closed" && (
        <Calendar
          minimized={apps.calendar === "minimized"}
          onClose={() => closeApp("calendar")}
          onMinimize={() => minimizeApp("calendar")}
        />
      )}

      {apps.notes !== "closed" && (
        <Note
          minimized={apps.notes === "minimized"}
          onClose={() => closeApp("notes")}
          onMinimize={() => minimizeApp("notes")}
        />
      )}

      {apps.mail !== "closed" && (
        <Mail
          minimized={apps.mail === "minimized"}
          onClose={() => closeApp("mail")}
          onMinimize={() => minimizeApp("mail")}
        />
      )}

      {apps.github !== "closed" && (
        <Github
          minimized={apps.github === "minimized"}
          onClose={() => closeApp("github")}
          onMinimize={() => minimizeApp("github")}
        />
      )}

      {apps.resume !== "closed" && (
        <Pdf
          minimized={apps.resume === "minimized"}
          onClose={() => closeApp("resume")}
          onMinimize={() => minimizeApp("resume")}
        />
      )}

      {apps.spotify !== "closed" && (
        <Spotify
          minimized={apps.spotify === "minimized"}
          onClose={() => closeApp("spotify")}
          onMinimize={() => minimizeApp("spotify")}
        />
      )}

      {apps.code !== "closed" && (
        <Code
          minimized={apps.code === "minimized"}
          onClose={() => closeApp("code")}
          onMinimize={() => minimizeApp("code")}
        />
      )}

      <Dock apps={apps} openApp={openApp} />
    </>
  )
}
