import React, { useState } from "react"
import MacWindow from "./MacWindow"
import "./Mail.scss"

const Mail = ({ minimized, onClose, onMinimize, zIndex, onFocus }) => {
  const [copied, setCopied] = useState(false)
  const email = "mannatgupta146@gmail.com"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <MacWindow
      appId="mail"
      title="Mail"
      minimized={minimized}
      onClose={onClose}
      onMinimize={onMinimize}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className="mail-container">
        <div className="mail-wrapper">
          <div className="mail-header">
            <span className="availability-tag">OPEN FOR COLLABORATION</span>
            <h1>Mannat Gupta</h1>
            <p className="mail-intro">
              Reach out for projects, freelance work, or product ideas worth
              building properly.
            </p>
          </div>

          <div className="mail-pills">
            <span>Fast replies</span>
            <span>Portfolio ready</span>
            <span>Remote friendly</span>
          </div>

          <div className="mail-content">
            <div className="terminal-text">
              <span className="command"># contact --init</span>
              <p>
                I enjoy building clean interfaces, thoughtful interactions, and
                systems that feel polished instead of rushed. If the work is
                interesting, I am in.
              </p>
            </div>

            <div className="action-grid">
              <button
                className="mail-btn main"
                onClick={() => (window.location.href = `mailto:${email}`)}
              >
                <i className="ri-mail-send-line" />
                Send Mail
              </button>

              <button
                className={`mail-btn secondary ${copied ? "success" : ""}`}
                onClick={copyToClipboard}
              >
                <i className={copied ? "ri-check-line" : "ri-file-copy-line"} />
                {copied ? "Copied" : "Copy Email"}
              </button>
            </div>
          </div>

          <div className="mail-bottom">
            <div className="social-links">
              <a
                href="https://linkedin.com/in/mannatgupta146"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-linkedin-box-line" />
                LinkedIn
              </a>
              <a
                href="https://github.com/mannatgupta146"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-github-line" />
                GitHub
              </a>
            </div>

            <div className="online-indicator">
              <span>Online</span>
              <span className="dot" />
            </div>
          </div>
        </div>
      </div>
    </MacWindow>
  )
}

export default Mail
