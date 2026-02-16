import React from "react";
import MacWindow from "./MacWindow";
import "./Pdf.scss";

const Pdf = ({ minimized, onClose, onMinimize, zIndex, onFocus }) => {
  return (
    <MacWindow appId="resume" title="Resume" minimized={minimized} onClose={onClose} onMinimize={onMinimize} zIndex={zIndex} onFocus={onFocus}>
      <div className="pdf-window">
        <iframe
          title="PDF Viewer"
          src="/resume.pdf"
          loading="lazy"
        />
      </div>
    </MacWindow>
  );
};

export default Pdf;
