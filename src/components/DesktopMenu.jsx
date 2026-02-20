import React, { useEffect, useRef, useState } from "react";
import "./DesktopMenu.scss";

export default function DesktopMenu({ x, y, onAction }) {
  const menuRef = useRef(null);
  const [pos, setPos] = useState({ left: x, top: y });

  // prevent menu from going outside screen
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const padding = 8;
    const rect = menu.getBoundingClientRect();

    let newX = x;
    let newY = y;

    if (x + rect.width > window.innerWidth - padding)
      newX = window.innerWidth - rect.width - padding;

    if (y + rect.height > window.innerHeight - padding)
      newY = window.innerHeight - rect.height - padding;

    if (newX < padding) newX = padding;
    if (newY < padding) newY = padding;

    setPos({ left: newX, top: newY });
  }, [x, y]);

  return (
    <div
      ref={menuRef}
      className="desktop-menu"
      style={{ top: pos.top, left: pos.left }}
    >
      {/* SYSTEM */}
      <MenuItem icon="ri-refresh-line" label="Refresh" onClick={() => onAction("refresh")} />

      <Divider />

      {/* DESKTOP */}
      <MenuItem icon="ri-image-line" label="Change Wallpaper" onClick={() => onAction("wallpaper")} />
      <MenuItem icon="ri-sticky-note-line" label="New Note" onClick={() => onAction("new-note")} />

      <Divider />

      {/* WINDOWS */}
      <MenuItem icon="ri-terminal-box-line" label="Open Terminal" onClick={() => onAction("terminal")} />
      <MenuItem icon="ri-checkbox-multiple-line" label="Close All Tabs" onClick={() => onAction("close-all")} />
      <MenuItem icon="ri-lock-line" label="Lock Screen" onClick={() => onAction("lock")} />

      <Divider />

      {/* SETTINGS */}
      <MenuItem icon="ri-palette-line" label="Personalize" onClick={() => onAction("accent")} />
      <MenuItem icon="ri-settings-3-line" label="Settings" onClick={() => onAction("settings")} />
    </div>
  );
}

const MenuItem = ({ icon, label, onClick }) => (
  <div className="menu-item" onClick={onClick}>
    <i className={icon}></i>
    <span>{label}</span>
  </div>
);

const Divider = () => <div className="menu-divider" />;