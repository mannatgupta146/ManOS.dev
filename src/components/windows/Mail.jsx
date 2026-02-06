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
        {/* The noise texture makes the glass look real */}
        <div className="noise-overlay" />
        
        <div className="mail-wrapper">
          <header className="mail-header">
            <div className="stamp-wrapper">
              <div className="postage-stamp">
                <img src="https://github.com/mannatgupta146.png" alt="User" />
              </div>
              <div className="post-mark" />
            </div>
            <div className="header-text">
              <span className="label">RECIPIENT</span>
              <h1>Mannat Gupta</h1>
            </div>
          </header>

          <main className="mail-body">
            <p className="typewriter">
              // Initializing connection... <br />
              Ready to collaborate on the next big thing.
            </p>
            
            <div className="action-grid">
              <button className="mail-btn main" onClick={() => window.location.href = `mailto:${email}`}>
                Send Message
                <span className="shimmer" />
              </button>
              
              <button className={`mail-btn secondary ${copied ? 'success' : ''}`} onClick={copyToClipboard}>
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>
          </main>

          <footer className="mail-links">
            <a href="https://linkedin.com/in/mannatgupta146" target="_blank" rel="noreferrer">LinkedIn</a>
            <span className="separator">/</span>
            <a href="https://github.com/mannatgupta146" target="_blank" rel="noreferrer">GitHub</a>
            <div className="status-dot" />
          </footer>
        </div>
      </div>
    </MacWindow>
  );
};

export default Mail;