import React from "react";
import "./Dock.scss";

const Dock = ({ apps = {}, openApp }) => {

  const handleClick = (app) => {
    const state = apps[app];

    // OPEN
    if (state === "closed") {
      openApp(app);
      return;
    }

    // MINIMIZE
    if (state === "open") {
      window.dispatchEvent(
        new CustomEvent("minimizeApp", { detail: app })
      );
      return;
    }

    // RESTORE
    if (state === "minimized") {
      openApp(app);
    }
  };

  const Icon = ({ app, icon, label, className }) => {
    const state = apps[app];

    return (
      <div
        className={`icon ${className}`}
        data-label={label}
        onClick={() => handleClick(app)}
      >
        <img src={icon} alt="" />

        {/* indicator */}
        {state !== "closed" && (
          <span
            className={`indicator ${
              state === "open" ? "active" : "minimized"
            }`}
          />
        )}
      </div>
    );
  };

  return (
    <footer className="dock">
      <Icon app="terminal" icon="/icons/cli.svg" label="Terminal" className="cli-icon" />
      <Icon app="calendar" icon="/icons/calender.png" label="Calendar" className="calender-icon" />
      <Icon app="mail" icon="/icons/mail.svg" label="Mail" className="mail-icon" />
      <Icon app="github" icon="/icons/github.svg" label="GitHub" className="github-icon" />
      <Icon app="resume" icon="/icons/pdf.svg" label="Resume" className="pdf-icon" />
      <Icon app="notes" icon="/icons/note.svg" label="Notes" className="note-icon" />
      <Icon app="code" icon="/icons/code.png" label="Code Editor" className="code-icon" />
      <Icon app="spotify" icon="/icons/spotify.svg" label="Spotify" className="spotify-icon" />
      <Icon app="camera" icon="/icons/camera.svg" label="Camera" className="camera-icon" />
      <Icon app="gallery" icon="/icons/gallery.png" label="Gallery" className="gallery-icon" />
    </footer>
  );
};

export default Dock;
