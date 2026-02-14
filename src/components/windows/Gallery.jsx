import React, { useEffect, useState } from "react";
import MacWindow from "./MacWindow";
import "./Gallery.scss";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selected, setSelected] = useState([]);

  const loadPhotos = () => {
    const saved = JSON.parse(localStorage.getItem("gallery") || "[]");
    setPhotos(saved);
  };

  useEffect(() => {
    loadPhotos();
    // Listen for the custom event from the Camera component
    window.addEventListener("galleryUpdated", loadPhotos);
    return () => window.removeEventListener("galleryUpdated", loadPhotos);
  }, []);

  const toggleSelect = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const deleteSelected = () => {
    if (selected.length === 0) return;
    const updated = photos.filter((_, i) => !selected.includes(i));
    localStorage.setItem("gallery", JSON.stringify(updated));
    setPhotos(updated);
    setSelected([]);
    window.dispatchEvent(new Event("galleryUpdated")); // Keep other instances in sync
  };

  const downloadSelected = () => {
    selected.forEach((i) => {
      const link = document.createElement("a");
      link.href = photos[i].src;
      link.download = `Capture-${new Date(photos[i].date).toLocaleDateString()}.png`;
      link.click();
    });
  };

  return (
    <MacWindow>
      <div className="gallery-container">
        {/* Modern Apple-style Header */}
        <header className="gallery-header">
          <div className="header-left">
            <h2>Photos</h2>
            <span className="photo-count">{photos.length} Photos</span>
          </div>
          
          <div className="header-actions">
            {selected.length > 0 && (
              <>
                <button className="btn-action" onClick={downloadSelected}>
                  Download ({selected.length})
                </button>
                <button className="btn-action danger" onClick={deleteSelected}>
                  Delete
                </button>
              </>
            )}
            <button className="btn-secondary" onClick={() => setSelected(photos.map((_, i) => i))}>
              Select All
            </button>
          </div>
        </header>

        <div className="gallery-content">
          {photos.length === 0 ? (
            <div className="empty-state">
              <div className="icon-circle">📸</div>
              <h3>No Photos</h3>
              <p>Photos you take with Camera will appear here.</p>
            </div>
          ) : (
            <div className="photo-grid">
              {photos.map((photo, i) => (
                <div
                  key={photo.date}
                  className={`photo-item ${selected.includes(i) ? "is-selected" : ""}`}
                  onClick={() => toggleSelect(i)}
                >
                  <img src={photo.src} alt="Captured" loading="lazy" />
                  <div className="selection-indicator">
                    <div className="check-mark">✓</div>
                  </div>
                  <div className="photo-info">
                    {new Date(photo.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MacWindow>
  );
};

export default Gallery;