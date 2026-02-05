import React from 'react'
import { Rnd } from 'react-rnd'
import './MacWindow.scss'

const MacWindow = ({children}) => {
  return (
    <Rnd>
        <div className="windows">
            <div className="nav">
                <div className="dots">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                </div>

                <div className="title">
                    <p> ~ mannatgupta146</p>
                </div>

            </div>
            <div className="main-content">
                {children}
            </div>
        </div>
    </Rnd>
  )
}

export default MacWindow