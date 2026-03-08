import React, { useEffect, useState } from "react"
import "./App.scss"
import Nav from "./components/Nav"
import Desktop from "./components/windows/Desktop"
import NotificationCenter from "./components/NotificationCenter"

const App = () => {
  const [mobileTime, setMobileTime] = useState("")
  const [mobileDate, setMobileDate] = useState("")
  const [mobileMenuRequest, setMobileMenuRequest] = useState(0)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setMobileTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
      setMobileDate(
        now.toLocaleDateString([], {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
      )
    }

    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main>
      <NotificationCenter />
      <div className="mobile-ambient-shell" aria-hidden="false">
        <button
          className="mobile-ambient-time"
          type="button"
          aria-label="Open Spotlight"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("openSpotlight", {
                detail: { source: "button" },
              }),
            )
          }
        >
          <div className="mobile-ambient-time__time">{mobileTime}</div>
          <div className="mobile-ambient-time__date">{mobileDate}</div>
        </button>

        <div className="mobile-ambient-actions">
          <button
            className="mobile-ambient-action"
            type="button"
            aria-label="Open Spotlight"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("openSpotlight", {
                  detail: { source: "button" },
                }),
              )
            }
          >
            <i className="ri-search-line" />
            <span>Search</span>
          </button>

          <button
            className="mobile-ambient-action"
            type="button"
            aria-label="Open quick actions"
            onClick={() => setMobileMenuRequest((value) => value + 1)}
          >
            <i className="ri-more-2-fill" />
            <span>Actions</span>
          </button>
        </div>
      </div>
      <Nav />
      <Desktop mobileMenuRequest={mobileMenuRequest} />
    </main>
  )
}

export default App
