import React, { useEffect, useRef, useState } from "react"
import "./DesktopMenu.scss"

const MENU_ITEMS = [
  { icon: "ri-refresh-line", label: "Refresh", action: "refresh" },
  {
    icon: "ri-image-line",
    label: "Change Wallpaper",
    action: "wallpaper",
  },
  { icon: "ri-sticky-note-line", label: "New Note", action: "new-note" },
  {
    icon: "ri-terminal-box-line",
    label: "Open Terminal",
    action: "terminal",
  },
  {
    icon: "ri-checkbox-multiple-line",
    label: "Close All Tabs",
    action: "close-all",
  },
  { icon: "ri-lock-line", label: "Lock Screen", action: "lock" },
  { icon: "ri-settings-3-line", label: "Settings", action: "settings" },
]

export default function DesktopMenu({ x, y, onAction, onClose }) {
  const menuRef = useRef(null)
  const [pos, setPos] = useState({ left: x, top: y })
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (viewportWidth <= 1024) {
      return
    }

    const menu = menuRef.current
    if (!menu) return

    const padding = 8
    const rect = menu.getBoundingClientRect()

    let newX = x
    let newY = y

    if (x + rect.width > window.innerWidth - padding) {
      newX = window.innerWidth - rect.width - padding
    }

    if (y + rect.height > window.innerHeight - padding) {
      newY = window.innerHeight - rect.height - padding
    }

    if (newX < padding) newX = padding
    if (newY < padding) newY = padding

    setPos({ left: newX, top: newY })
  }, [x, y, viewportWidth])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const isMobile = viewportWidth <= 768
  const isTablet = viewportWidth > 768 && viewportWidth <= 1024
  const isTouchLayout = isMobile || isTablet
  const menuStyle = isTouchLayout ? undefined : { top: pos.top, left: pos.left }

  return (
    <div
      className={`desktop-menu-shell ${isTouchLayout ? "touch" : "desktop"}`}
    >
      {isTouchLayout && (
        <button
          className="desktop-menu-backdrop"
          type="button"
          aria-label="Close quick actions"
          onClick={onClose}
        />
      )}

      <div
        ref={menuRef}
        className={`desktop-menu ${isMobile ? "mobile-menu" : ""} ${isTablet ? "tablet-menu" : ""}`}
        style={menuStyle}
        onClick={(event) => event.stopPropagation()}
      >
        {isTouchLayout && (
          <div className="desktop-menu-header">
            <div>
              <p className="desktop-menu-kicker">Quick Actions</p>
              <h3>Desktop Controls</h3>
            </div>

            <button
              className="desktop-menu-close"
              type="button"
              aria-label="Close quick actions"
              onClick={onClose}
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        )}

        <div className="desktop-menu-list">
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.action}>
              <MenuItem
                icon={item.icon}
                label={item.label}
                onClick={() => onAction(item.action)}
              />
              {!isTouchLayout &&
                index !== MENU_ITEMS.length - 1 &&
                shouldRenderDivider(index) && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

function shouldRenderDivider(index) {
  return index === 0 || index === 2 || index === 5
}

const MenuItem = ({ icon, label, onClick }) => (
  <button className="menu-item" type="button" onClick={onClick}>
    <i className={icon}></i>
    <span>{label}</span>
  </button>
)

const Divider = () => <div className="menu-divider" />
