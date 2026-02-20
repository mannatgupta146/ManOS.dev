import React from "react";
import "./DesktopMenu.scss";

export default function DesktopMenu({ x, y, onAction }) {
  return (
    <div
      className="desktop-menu"
      style={{ top: y, left: x }}
    >
      <MenuItem icon="ri-refresh-line" label="Refresh" onClick={() => onAction("refresh")} />

      <Divider />

      <MenuItem icon="ri-image-line" label="Change Wallpaper" onClick={() => onAction("wallpaper")} />
      <MenuItem icon="ri-add-line" label="New Note" onClick={() => onAction("new-note")} />

      <Divider />

      <MenuItem icon="ri-terminal-box-line" label="Open Terminal" onClick={() => onAction("terminal")} />
      <MenuItem icon="ri-lock-line" label="Lock Screen" onClick={() => onAction("lock")} />

      <Divider />

      <MenuItem icon="ri-palette-line" label="Personalize" onClick={() => onAction("accent")} />
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
