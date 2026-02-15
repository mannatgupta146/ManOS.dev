import React, { useEffect, useState } from "react"
import "./NavRight.scss"

const NavRight = () => {
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [visits, setVisits] = useState(0)

  // ⏰ TIME
  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
      setDate(
        now.toLocaleDateString([], {
          weekday: "long",
          day: "numeric",
          month: "short",
        }),
      )
    }

    update()
    const i = setInterval(update, 60000)
    return () => clearInterval(i)
  }, [])

  // 👥 VISITS (+1 per session)
  useEffect(() => {
    if (!sessionStorage.getItem("manos-session")) {
      const count = Number(localStorage.getItem("manos-visits") || 0) + 1
      localStorage.setItem("manos-visits", count)
      sessionStorage.setItem("manos-session", "true")
      localStorage.removeItem("desktop_layout")

      // clear window positions
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("window_")) {
          localStorage.removeItem(key)
        }
      })

      setVisits(count)
    } else {
      setVisits(Number(localStorage.getItem("manos-visits") || 0))
    }
  }, [])

  return (
    <div className="right">
      {/* TIME (PRIMARY) */}
      <Status primary text={time} title={date} sub={`Session #${visits}`} />

      {/* VISITS */}
      <Status
        icon="ri-user-line"
        text={visits}
        title="Visits"
        sub={`${visits} total opens`}
      />

      {/* WIFI */}
      <Status icon="ri-wifi-line" title="Wi-Fi" sub="Connected" />

      {/* BATTERY (VISUAL ONLY) */}
      <button className="status-btn battery">
        <i className="ri-battery-2-charge-line" />
      </button>
    </div>
  )
}

const Status = ({ icon, text, title, sub, primary }) => (
  <div className={`status-wrap ${primary ? "primary" : ""}`}>
    <button className="status-btn">
      {icon && <i className={icon} />}
      {text && <span className="time-text">{text}</span>}
    </button>

    <div className="status-popover">
      <span className="caret" />
      <p className="title">{title}</p>
      <p className="sub">{sub}</p>
    </div>
  </div>
)

export default NavRight
