import React from 'react'
import "./Dock.scss"

const Dock = () => {
  return (
    <footer className='dock'>
        <div className="icon cli-icon"><img src="/icons/cli.svg" alt="" /></div>
        <div className="icon calender-icon"><img src="/icons/calender.svg" alt="" /></div>
        <div className="icon mail-icon"><img src="/icons/mail.svg" alt="" /></div>
        <div className="icon github-icon"><img src="/icons/github.svg" alt="" /></div>
        <div className="icon pdf-icon"><img src="/icons/pdf.svg" alt="" /></div>
        <div className="icon note-icon"><img src="/icons/note.svg" alt="" /></div>
        <div className="icon brave-icon"><img src="/icons/brave.svg" alt="" /></div>
        <div className="icon spotify-icon"><img src="/icons/spotify.svg" alt="" /></div>
    </footer>
  )
}

export default Dock
