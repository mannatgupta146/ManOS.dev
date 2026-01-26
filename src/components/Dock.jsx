import React from 'react'
import "./Dock.scss"

const Dock = () => {
  return (
    <footer className='dock'>
        <div className="icon cli"><img src="/icons/cli.svg" alt="" /></div>
        <div className="icon calender"><img src="/icons/calender.svg" alt="" /></div>
        <div className="icon mail"><img src="/icons/mail.svg" alt="" /></div>
        <div className="icon github"><img src="/icons/github.svg" alt="" /></div>
        <div className="icon pdf"><img src="/icons/pdf.svg" alt="" /></div>
        <div className="icon note"><img src="/icons/note.svg" alt="" /></div>
        <div className="icon link"><img src="/icons/link.svg" alt="" /></div>
        <div className="icon spotify"><img src="/icons/spotify.svg" alt="" /></div>
    </footer>
  )
}

export default Dock
