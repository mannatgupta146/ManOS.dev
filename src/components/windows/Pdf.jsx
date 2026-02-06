import React from "react";
import MacWindow from "./MacWindow";
import "./Pdf.scss";

const Pdf = () => {
  return (
    <MacWindow>
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
