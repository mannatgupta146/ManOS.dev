import React, { useEffect, useRef, useState } from "react";
import "./DesktopMenu.scss";

export default function DesktopMenu({ x, y, onAction }) {
  const menuRef = useRef(null);
  const [pos, setPos] = useState({ left: x, top: y });

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const padding = 8; // safe margin

    const rect = menu.getBoundingClientRect();
    let newX = x;
    let newY = y;

    // overflow right
    if (x + rect.width > window.innerWidth - padding) {
      newX = window.innerWidth - rect.width - padding;
    }

    // overflow bottom
    if (y + rect.height > window.innerHeight - padding) {
      newY = window.innerHeight - rect.height - padding;
    }

    // prevent negative
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