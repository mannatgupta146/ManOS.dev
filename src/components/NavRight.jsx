import React, { useEffect, useState } from "react"
import "./NavRight.scss"
import NotificationCenter from "./NotificationCenter"

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
      <Status
        primary
        text={time}
        title={date}
        sub={`Session #${visits}`}
        accent="#0a84ff"
        accentIcon="ri-time-fill"
      />

      {/* VISITS */}
      <Status
        icon="ri-user-line"
        text={visits}
        title="Visitors"
        sub={`${visits} total sessions`}
        accent="#ff9f0a"
        accentIcon="ri-group-fill"
      />

      {/* WIFI */}
      <Status
        icon="ri-wifi-line"
        title="Wi-Fi"
        sub="Connected"
        className="wifi"
        accent="#34c759"
        accentIcon="ri-wifi-fill"
      />

      {/* BATTERY */}
      <Status
        icon="ri-battery-2-charge-line"
        title="Battery"
        sub="Fully Charged"
        className="battery"
        accent="#34c759"
        accentIcon="ri-battery-2-charge-fill"
        alignRight
      />

      {/* NOTIFICATIONS */}
      <NotificationCenter />
    </div>
  )
}

const Status = ({
  icon,
  text,
  title,
  sub,
  primary,
  className = "",
  accent,
  accentIcon,
  alignRight,
}) => (
  <div
    className={`status-wrap ${primary ? "primary" : ""} ${alignRight ? "align-right" : ""}`}
  >
    <button className={`status-btn ${className}`}>
      {icon && <i className={icon} />}
      {text !== undefined && text !== null && (
        <span className="time-text">{text}</span>
      )}
    </button>

    <div className="status-popover">
      <span className="caret" />
      <div className="popover-row">
        {accentIcon && (
          <i
            className={`popover-icon ${accentIcon}`}
            style={{ color: accent }}
          />
        )}
        <div className="popover-text">
          <p className="title">{title}</p>
          <p className="sub" style={{ color: accent }}>
            {sub}
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default NavRight
