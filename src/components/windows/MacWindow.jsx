import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import "./MacWindow.scss";

const MacWindow = ({
  children,
  title = "Window",
  minimized,
  onClose,
  onMinimize,
  appId,
  zIndex = 1,
  onFocus
}) => {

  const STORAGE_KEY = `window_${appId}`;

  // load saved layout
  const loadState = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : { width: "33vw", height: "52vh", x: 320, y: 160 };
  };

  const [windowState, setWindowState] = useState(() => loadState());
  const [maximized, setMaximized] = useState(false);

  const NAVBAR_HEIGHT =
    document.querySelector(".top-navbar")?.offsetHeight || 32;

  // save layout
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(windowState));
  }, [windowState]);

  if (minimized) return null;

  return (
    <Rnd
      style={{ zIndex }}
      onMouseDown={onFocus}
      size={
        maximized
          ? {
              width: window.innerWidth,
              height: window.innerHeight - NAVBAR_HEIGHT,
            }
          : windowState
      }
      position={
        maximized
          ? { x: 0, y: NAVBAR_HEIGHT }
          : { x: windowState.x, y: windowState.y }
      }
      minWidth={350}
      minHeight={300}
      bounds={maximized ? "body" : "window"}
      dragHandleClassName="nav"
      disableDragging={maximized}
      enableResizing={!maximized}
      onDragStop={(e, d) =>
        setWindowState((s) => ({ ...s, x: d.x, y: d.y }))
      }
      onResizeStop={(e, dir, ref, delta, pos) =>
        setWindowState({
          width: ref.style.width,
          height: ref.style.height,
          ...pos,
        })
      }
    >
      <div className={`windows ${maximized ? "maximized" : ""}`}>

        <div className="nav">
          <div className="nav-left">

            <div className="dots">
              <div
                className="dot red"
                onClick={(e) => {
                  e.stopPropagation();
                  localStorage.removeItem(STORAGE_KEY);
                  onClose();
                }}
              />

              <div
                className="dot yellow"
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
              />

              <div
                className={`dot green ${maximized ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setMaximized(!maximized);
                }}
              />
            </div>

            <div className="title">
              <p>~ mannatgupta146</p>
            </div>
          </div>

          <div className="nav-right">
            📁 {title}
          </div>
        </div>

        <div className="main-content">
          {children}
        </div>

      </div>
    </Rnd>
  );
};

export default MacWindow;
