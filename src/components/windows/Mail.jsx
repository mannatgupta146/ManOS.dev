import React, { useState } from "react";
import MacWindow from "./MacWindow";
import "./Mail.scss";

const Mail = () => {
  const [copied, setCopied] = useState(false);
  const email = "mannatgupta146@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MacWindow>
      <div className="mail-container">
        <div className="mail-wrapper">
          {/* HEADER */}
          <div className="mail-header">
            <span className="availability-tag">AVAILABLE FOR HIRE</span>
            <h1>Mannat Gupta</h1>
          </div>

          {/* CONTENT */}
          <div className="mail-content">
            <div className="terminal-text">
              <span className="command"># contact --init</span>
              <p>
                Passionate about building seamless digital experiences.
                Let’s create something meaningful together.
              </p>
            </div>

            <div className="action-grid">
              <button
                className="mail-btn main"
                onClick={() =>
                  (window.location.href = `mailto:${email}`)
                }
              >
                Send Message
              </button>

              <button
                className={`mail-btn secondary ${
                  copied ? "success" : ""
                }`}
                onClick={copyToClipboard}
              >
                {copied ? "✓ Copied" : "Copy Email"}
              </button>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mail-bottom">
            <div className="social-links">
              <a
                href="https://linkedin.com/in/mannatgupta146"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/mannatgupta146"
                target="_blank"
                rel="noreferrer"
              >
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
  );
};

export default Mail;
