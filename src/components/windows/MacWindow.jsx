import React, { useState } from "react";
import { Rnd } from "react-rnd";
import "./MacWindow.scss";

const MacWindow = ({ children, title = "Window" }) => {
  const [closed, setClosed] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);

  const [windowState, setWindowState] = useState({
    width: "33vw",
    height: "52vh",
    x: 320,
    y: 160,
  });

  // detect navbar height
  const NAVBAR_HEIGHT =
    document.querySelector(".top-navbar")?.offsetHeight || 32;

  if (closed) return null;

  if (minimized) return null; // hidden (dock will restore)

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

        {/* NAVBAR */}
        <div className="nav">

          {/* LEFT */}
          <div className="nav-left">
            <div className="dots">
              {/* CLOSE */}
              <div
                className="dot red"
                onClick={() => setClosed(true)}
              />

              {/* MINIMIZE */}
              <div
                className="dot yellow"
                onClick={() => setMinimized(true)}
              />

              {/* MAXIMIZE */}
              <div
                className={`dot green ${maximized ? "active" : ""}`}
                onClick={() => setMaximized(!maximized)}
              />
            </div>

            <div className="title">
              <p>~ mannatgupta146</p>
            </div>
          </div>

          {/* RIGHT SIDE — APP NAME */}
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
