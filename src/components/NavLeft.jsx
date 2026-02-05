import React, { useState } from "react";
import "./NavLeft.scss";

const NavLeft = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showManOS, setShowManOS] = useState(false);
  const [showConnect, setShowConnect] = useState(false);

  const closeAll = () => {
    setShowAbout(false);
    setShowManOS(false);
    setShowConnect(false);
  };

  return (
    <>
      {/* LEFT NAV */}
      <div className="left">
        <button
          className="apple-icon"
          onClick={() => {
            closeAll();
            setShowManOS(true);
          }}
        >
          <img src="./icons/apple.svg" alt="Apple" />
        </button>

        <button className="name-item">Mannat Gupta</button>

        <button
          className="menu-item"
          onClick={() => {
            closeAll();
            setShowAbout(true);
          }}
        >
          About
        </button>

        <div className="connect-wrapper">
          <button
            className="menu-item"
            onClick={() => setShowConnect(!showConnect)}
          >
            Connect
            <span className={`arrow ${showConnect ? "open" : ""}`}>
              <i className="ri-arrow-up-s-line"></i>
            </span>
          </button>

          {showConnect && (
            <div className="connect-dropdown">
              <a
                href="https://instagram.com/mannat_1411"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Instagram</span>
                <i className="ri-instagram-line"></i>
              </a>

              <a
                href="https://x.com/MannatGupta146"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>X (Twitter)</span>
                <i className="ri-twitter-x-line"></i>
              </a>

              <a
                href="https://www.linkedin.com/in/mannatgupta146/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>LinkedIn</span>
                <i className="ri-linkedin-box-fill"></i>
              </a>

              <a
                href="https://github.com/mannatgupta146"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>GitHub</span>
                <i className="ri-github-fill"></i>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ABOUT MODAL */}
      {showAbout && (
        <div className="overlay" onClick={closeAll}>
          <div className="popover" onClick={(e) => e.stopPropagation()}>
            <img src="./icons/apple.svg" alt="Apple" />
            <p className="manos-title">ManOS v1.0</p>

            <p className="manos-info">
              <span>System initialized successfully.</span><br />
              Admin: Mannat Gupta<br />
              Mode: Portfolio Environment
            </p>

            <p className="manos-status">
              You are now inside ManOS.
            </p>
          </div>
        </div>
      )}

      {/* APPLE MODAL */}
      {showManOS && (
        <div className="overlay" onClick={closeAll}>
          <div className="apple-only" onClick={(e) => e.stopPropagation()}>
            <img src="./icons/apple.svg" alt="Apple" />
            <span className="apple-label">ManOS v1.0</span>
          </div>
        </div>
      )}
    </>
  );
};

export default NavLeft;
