import React, { useState, useEffect } from "react";
import Dock from "../Dock";

import Camera from "./Camera";
import Gallery from "./Gallery";
import Cli from "./Cli";
import Calendar from "./Calendar";
import Code from "./CodeEditor";
import Github from "./Github";
import Mail from "./Mail";
import Note from "./Note";
import Pdf from "./Pdf";
import Spotify from "./Spotify";

export default function Desktop() {

  const STORAGE_KEY = "desktop_layout";

  /* ---------------- Z INDEX SYSTEM ---------------- */

  const [zMap, setZMap] = useState({});
  const [topZ, setTopZ] = useState(20);

  const focusApp = (app) => {
    setTopZ((z) => {
      const newZ = z + 1;
      setZMap(prev => ({ ...prev, [app]: newZ }));
      return newZ;
    });
  };

  /* ---------------- LOAD SESSION ---------------- */

  const loadLayout = () => {
    if (!sessionStorage.getItem("manos-session")) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  };

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
    }
  );

  /* ---------------- APP STATE ---------------- */

  const openApp = (app) => {
    focusApp(app);
    setApps(prev => ({ ...prev, [app]: "open" }));
  };

  const minimizeApp = (app) => {
    setApps(prev => ({ ...prev, [app]: "minimized" }));
  };

  const closeApp = (app) => {
    setApps(prev => ({ ...prev, [app]: "closed" }));
  };

  /* listen minimize event from dock */
  useEffect(() => {
    const handler = (e) => minimizeApp(e.detail);
    window.addEventListener("minimizeApp", handler);
    return () => window.removeEventListener("minimizeApp", handler);
  }, []);

  /* save layout */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  }, [apps]);

  /* helper to render window */
  const renderApp = (Component, key) =>
    apps[key] !== "closed" && (
      <Component
        minimized={apps[key] === "minimized"}
        onClose={() => closeApp(key)}
        onMinimize={() => minimizeApp(key)}
        zIndex={zMap[key]}
        onFocus={() => focusApp(key)}
      />
    );

  return (
    <>
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

      <Dock apps={apps} openApp={openApp} />
    </>
  );
}
