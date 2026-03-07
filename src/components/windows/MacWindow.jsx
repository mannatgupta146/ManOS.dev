import React, { useState, useEffect } from "react"
import { Rnd } from "react-rnd"
import "./MacWindow.scss"

const MacWindow = ({
  children,
  title,
  minimized,
  onClose,
  onMinimize,
  appId,
  zIndex = 1,
  onFocus,
}) => {
  const getIsMobile = () => window.innerWidth <= 768

  const STORAGE_KEY = `window_${appId}`

  const loadState = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved
      ? JSON.parse(saved)
      : { width: "33vw", height: "52vh", x: 320, y: 160 }
  }

  const [windowState, setWindowState] = useState(loadState)
  const [maximized, setMaximized] = useState(false)
  const [isMobile, setIsMobile] = useState(getIsMobile)
  const [mobileCompact, setMobileCompact] = useState(false)

  const NAVBAR_HEIGHT =
    document.querySelector("nav")?.offsetHeight || (isMobile ? 44 : 35)

  const MOBILE_DOCK_OFFSET = isMobile ? 54 : 0

  const mobileHeight = mobileCompact
    ? Math.max(360, window.innerHeight - NAVBAR_HEIGHT - 140)
    : window.innerHeight - NAVBAR_HEIGHT - MOBILE_DOCK_OFFSET

  const mobileY = mobileCompact ? NAVBAR_HEIGHT + 10 : NAVBAR_HEIGHT

  useEffect(() => {
    const handleResize = () => setIsMobile(getIsMobile())
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setMobileCompact(false)
    }
  }, [isMobile])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(windowState))
  }, [windowState])

  if (minimized) return null

  return (
    <Rnd
      style={{ zIndex, position: "absolute" }}
      onMouseDownCapture={onFocus}
      size={
        maximized || isMobile
          ? {
              width: window.innerWidth,
              height: isMobile
                ? mobileHeight
                : window.innerHeight - NAVBAR_HEIGHT,
            }
          : windowState
      }
      position={
        maximized || isMobile
          ? { x: 0, y: isMobile ? mobileY : NAVBAR_HEIGHT }
          : { x: windowState.x, y: windowState.y }
      }
      minWidth={isMobile ? window.innerWidth : 350}
      minHeight={isMobile ? mobileHeight : 300}
      bounds={maximized || isMobile ? "body" : "window"}
      dragHandleClassName="nav"
      disableDragging={maximized || isMobile}
      enableResizing={!maximized && !isMobile}
      onDragStop={(e, d) => setWindowState((s) => ({ ...s, x: d.x, y: d.y }))}
      onResizeStop={(e, dir, ref, delta, pos) =>
        setWindowState({
          width: ref.style.width,
          height: ref.style.height,
          ...pos,
        })
      }
    >
      <div
        className={`windows ${maximized ? "maximized" : ""} ${isMobile ? "mobile-window" : ""}`}
      >
        <div className="nav">
          <div className="nav-left">
            <div className="dots">
              <div
                className="dot red"
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
              />
              <div
                className="dot yellow"
                onClick={(e) => {
                  e.stopPropagation()
                  onMinimize()
                }}
              />
              <div
                className={`dot green ${maximized ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation()
                  if (isMobile) {
                    setMobileCompact((prev) => !prev)
                  } else {
                    setMaximized(!maximized)
                  }
                }}
              />
            </div>
            <div className="title">
              <p>~ mannatgupta146</p>
            </div>
          </div>

          <div className="nav-right">📁 {title}</div>
        </div>

        <div className="main-content">{children}</div>
      </div>
    </Rnd>
  )
}

export default MacWindow
