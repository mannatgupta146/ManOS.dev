import React, { useState } from "react";
import MacWindow from "./MacWindow";
import "./Github.scss";

const Github = () => {
  const [play, setPlay] = useState(false);

  return (
    <MacWindow>
      <div className="github-window">
        {!play ? (
          <div className="github-card">
            <img
              src="https://github.com/mannatgupta146.png"
              alt="GitHub"
              className="git-avatar"
            />

            <p className="headline">GitHub · 2025</p>
            <p className="subline">
              Projects, contributions, and progress over the year.
            </p>

            <div className="actions">
              <a
                href="https://github.com/mannatgupta146"
                target="_blank"
                rel="noreferrer"
                className="github-btn"
              >
                <i className="ri-github-fill" />
                GitHub
              </a>

              <button className="play-btn" onClick={() => setPlay(true)}>
                ▶ Watch Story
              </button>
            </div>
          </div>
        ) : (
          /* 🔴 VIDEO LOGIC SAME AS YOUR ORIGINAL */
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
