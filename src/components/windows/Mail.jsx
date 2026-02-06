import React from "react";
import MacWindow from "./MacWindow";
import "./Mail.scss";

const Mail = () => {
  const openMail = () => {
    window.location.href = "mailto:mannatgupta146@gmail.com";
  };

  return (
    <MacWindow>
      <div className="mail-window">
        <div className="mail-content">
          <h2>Mail</h2>

          <p className="mail-desc">
            Reach out directly or connect via your preferred platform.
          </p>

          <div className="mail-actions">
            <button onClick={openMail}>Compose Email</button>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mannatgupta146@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Gmail
            </a>

            <a
              href="https://www.linkedin.com/in/mannatgupta146"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>

          <span className="mail-footer">
            mannatgupta146@gmail.com
          </span>
        </div>
      </div>
    </MacWindow>
  );
};

export default Mail;
