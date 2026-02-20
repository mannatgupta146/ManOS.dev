import React, { useEffect, useState } from "react";
import "./LockScreen.scss";

export default function LockScreen({ onUnlock }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="lockscreen" onClick={onUnlock}>
      <div className="lock-blur" />
      <div className="lock-vignette" />
      <div className="lock-light" />

      <div className="lock-content">
        <div className="lock-time">{time}</div>

        <div className="lock-date">
          {new Date().toLocaleDateString([], {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>

        <div className="lock-message">
          Click anywhere to unlock
        </div>
      </div>
    </div>
  );
}