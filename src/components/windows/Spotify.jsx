import React from "react";
import MacWindow from "./MacWindow";
import "./Spotify.scss";

const Spotify = ({ minimized, onClose, onMinimize, zIndex, onFocus }) => {
  return (
    <MacWindow appId="spotify" title="Spotify" minimized={minimized} onClose={onClose} onMinimize={onMinimize} zIndex={zIndex} onFocus={onFocus}>
      <div className="spotify-window">
        <div className="spotify-inner">
          <iframe
            title="ManOS Spotify"
            src="https://open.spotify.com/embed/playlist/5ZVj0PEMjcJxKLCacQJ8FH?theme=0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>

        <div className="spotify-ambient">
          <span>Listening on ManOS</span>
        </div>
      </div>
    </MacWindow>
  );
};

export default Spotify;
