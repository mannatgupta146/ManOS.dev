import React, { useState } from "react";
import MacWindow from "./MacWindow";
import "./Github.scss";

const Github = () => {
  const [play, setPlay] = useState(false);

  return (
    <MacWindow>
      <div className="github-window">
        {!play ? (
          <div className="intro">
            <p className="headline">GitHub · 2025</p>
            <p className="subline">
             Projects, contributions, and progress over the year.
            </p>

            <div className="actions">
              <a
                href="https://github.com/mannatgupta146"
                target="_blank"
                rel="noopener noreferrer"
                className="github-btn"
              >
                <i className="ri-github-fill"></i>
                GitHub
              </a>

              <button className="play-btn" onClick={() => setPlay(true)}>
                ▶ Watch Story
              </button>
            </div>
          </div>
        ) : (
          <video
            src="/github.mp4"
            autoPlay
            controls
            preload="none"
            className="github-video"
          />
        )}
      </div>
    </MacWindow>
  );
};

export default Github;
