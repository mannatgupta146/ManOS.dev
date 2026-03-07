import React, { useEffect, useRef, useState } from "react"
import MacWindow from "./MacWindow"
import "./Camera.scss"

const Camera = ({ minimized, onClose, onMinimize, zIndex, onFocus }) => {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [flash, setFlash] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // start camera when window is visible; clean up any pending or active
  // stream when minimized or unmounted.  if the user closes the window
  // before getUserMedia resolves we cancel and stop the stream as soon as
  // it arrives so the hardware light turns off immediately.
  useEffect(() => {
    let cancelled = false

    const begin = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: "user" },
        })
        // if effect was cleaned up while request pending, stop now
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setIsReady(true)
      } catch (err) {
        console.error("Camera access denied:", err)
      }
    }

    if (!minimized) {
      begin()
    }

    return () => {
      cancelled = true
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      setIsReady(false)
    }
  }, [minimized])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "user" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsReady(true)
      }
    } catch (err) {
      console.error("Camera access denied:", err)
    }
  }

  const capturePhoto = () => {
    const video = videoRef.current
    if (!video || !isReady) return

    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")
    // Mirror capture to match the preview
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0)

    const image = canvas.toDataURL("image/png")
    const saved = JSON.parse(localStorage.getItem("gallery") || "[]")
    saved.unshift({ src: image, date: Date.now() })
    localStorage.setItem("gallery", JSON.stringify(saved))

    // Instant update trigger for the Gallery app
    window.dispatchEvent(new Event("galleryUpdated"))

    // Visual feedback
    setFlash(true)
    setTimeout(() => setFlash(false), 150)
  }

  return (
    <MacWindow
      appId="camera"
      title="Camera"
      minimized={minimized}
      onClose={onClose}
      onMinimize={onMinimize}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className="camera-app-v2">
        <div className="viewfinder-container">
          {/* Mirror Video Preview */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="main-video-feed"
          />

          {/* Flash Effect Layer */}
          <div className={`camera-flash ${flash ? "visible" : ""}`} />

          {/* Corner Accents (Pro Look) */}
          <div className="viewfinder-corners">
            <div className="corner tl" />
            <div className="corner tr" />
            <div className="corner bl" />
            <div className="corner br" />
          </div>

          {/* Top Status Bar */}
          <div className="viewfinder-hud-top">
            <div className="recording-dot" />
            <span className="resolution-label">HD 720P</span>
          </div>

          {/* Bottom Control Section */}
          <div className="camera-footer">
            <div className="footer-side" />

            <button
              className="main-shutter"
              onClick={capturePhoto}
              disabled={!isReady}
              aria-label="Take Photo"
            >
              <div className="shutter-core" />
            </button>

            <div className="footer-side">
              <span className="mode-indicator">PHOTO</span>
            </div>
          </div>
        </div>
      </div>
    </MacWindow>
  )
}

export default Camera
