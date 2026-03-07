import React, { useState } from "react"
import MacWindow from "./MacWindow"
import "./Github.scss"

const Github = ({ minimized, onClose, onMinimize, zIndex, onFocus }) => {
  const [play, setPlay] = useState(false)

  return (
    <MacWindow
      appId="github"
      title="Github"
      minimized={minimized}
      onClose={onClose}
      onMinimize={onMinimize}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className="github-window">
        {!play ? (
          <div className="github-card">
            <span className="story-badge">Interactive GitHub story</span>

            <img
              src="https://github.com/mannatgupta146.png"
              alt="GitHub"
              className="git-avatar"
            />

            <p className="headline">GitHub Storyboard</p>
            <p className="subline">
              A quick walk through projects, experiments, commits, and the pace
              behind the build.
            </p>

            <div className="github-highlights">
              <span>Projects</span>
              <span>Experiments</span>
              <span>Progress</span>
            </div>

            <div className="actions">
              <button className="play-btn" onClick={() => setPlay(true)}>
                <i className="ri-play-circle-line" />
                Watch Story
              </button>

              <a
                href="https://github.com/mannatgupta146"
                target="_blank"
                rel="noopener noreferrer"
                className="github-btn"
              >
                <i className="ri-github-fill" />
                Open GitHub
              </a>
            </div>
          </div>
        ) : (
          <div className="github-player">
            <button className="github-back-btn" onClick={() => setPlay(false)}>
              <i className="ri-arrow-left-line" />
              Back
            </button>

            <video
              src="/github.mp4"
              autoPlay
              controls
              preload="none"
              className="github-video"
            />
          </div>
        )}
      </div>
    </MacWindow>
  )
}

export default Github
