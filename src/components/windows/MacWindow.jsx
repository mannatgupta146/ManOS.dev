import React, { useState } from "react";
import { Rnd } from "react-rnd";
import "./MacWindow.scss";

const MacWindow = ({
  children,
  title = "Window",
  minimized,
  onClose,
  onMinimize
}) => {
  const [maximized, setMaximized] = useState(false);

  const [windowState, setWindowState] = useState({
    width: "33vw",
    height: "52vh",
    x: 320,
    y: 160,
  });

  const NAVBAR_HEIGHT =
    document.querySelector(".top-navbar")?.offsetHeight || 32;

  // hide when minimized
  if (minimized) return null;

  return (
    <Rnd
      size={
        maximized
          ? {
              width: window.innerWidth,
              height: window.innerHeight - NAVBAR_HEIGHT,
            }
          : {
              width: windowState.width,
              height: windowState.height,
            }
      }
      position={
        maximized
          ? { x: 0, y: NAVBAR_HEIGHT }
          : { x: windowState.x, y: windowState.y }
      }
      minWidth={350}
      minHeight={300}
      bounds={maximized ? "body" : "window"}

      /* ⭐ DRAG ONLY FROM TITLE */
      dragHandleClassName="title"

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

        {/* NAV */}
        <div className="nav">

          <div className="nav-left">

            <div className="dots">

              {/* CLOSE */}
              <div
                className="dot red"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              />

              {/* MINIMIZE */}
              <div
                className="dot yellow"
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
              />

              {/* MAXIMIZE */}
              <div
                className={`dot green ${maximized ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setMaximized(!maximized);
                }}
              />

            </div>

            {/* ⭐ DRAG HANDLE */}
            <div className="title">
              <p>~ mannatgupta146</p>
            </div>

          </div>

          <div className="nav-right">
            📁 {title}
          </div>

        </div>

        {/* CONTENT */}
        <div className="main-content">
          {children}
        </div>

      </div>
    </Rnd>
  );
};

export default MacWindow;
