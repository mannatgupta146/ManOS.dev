import React from 'react'
import "./Dock.scss"

const Dock = () => {
  return (
    <footer className='dock'>
      <div className="icon cli-icon" data-label="Terminal">
        <img src="/icons/cli.svg" alt="" />
      </div>

      <div className="icon calender-icon" data-label="Calendar">
        <img src="/icons/calender.png" alt="" />
      </div>

      <div className="icon mail-icon" data-label="Mail">
        <img src="/icons/mail.svg" alt="" />
      </div>

      <div className="icon github-icon" data-label="GitHub">
        <img src="/icons/github.svg" alt="" />
      </div>

      <div className="icon pdf-icon" data-label="Resume">
        <img src="/icons/pdf.svg" alt="" />
      </div>

      <div className="icon note-icon" data-label="Notes">
        <img src="/icons/note.svg" alt="" />
      </div>

      <div className="icon code-icon" data-label="Code Editor">
        <img src="/icons/code.png" alt="" />
      </div>

      <div className="icon spotify-icon" data-label="Spotify">
        <img src="/icons/spotify.svg" alt="" />
      </div>

      <div className="icon camera-icon" data-label="Camera">
        <img src="/icons/camera.svg" alt="" />
      </div>

      <div className="icon gallery-icon" data-label="Gallery">
        <img src="/icons/gallery.png" alt="" />
      </div>
    </footer>
  )
}

export default Dock
