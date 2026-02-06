import React from "react";
import { Rnd } from "react-rnd";
import "./MacWindow.scss";

const MacWindow = ({ children }) => {
  return (
    <Rnd
      default={{
        width: "30vw",
        height: "50vh",
        x: 320,
        y: 160,
      }}
      minWidth={350}
      minHeight={300}
      bounds="window"
    >
      <div className="windows">
        <div className="nav">
          <div className="dots">
            <div className="dot red" />
            <div className="dot yellow" />
            <div className="dot green" />
          </div>

          <div className="title">
            <p>~ mannatgupta146</p>
          </div>
        </div>

        <div className="main-content">{children}</div>
      </div>
    </Rnd>
  );
};

export default MacWindow;
