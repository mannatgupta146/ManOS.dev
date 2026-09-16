import React, { useEffect, useRef, useState } from "react"
import "./NavRight.scss"

const NavRight = () => {
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [visits, setVisits] = useState(0)
  const [openStatus, setOpenStatus] = useState(null)
  const rightRef = useRef(null)

  const [batteryState, setBatteryState] = useState(() => {
    const startTime = Number(sessionStorage.getItem("manos-session-start") || Date.now())
    if (!sessionStorage.getItem("manos-session-start")) {
      sessionStorage.setItem("manos-session-start", startTime.toString())
    }
    const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000)
    const currentPct = Math.max(15, 100 - Math.floor(elapsedMinutes / 3))
    const charging = currentPct > 90 || elapsedMinutes < 2
    return { level: currentPct, charging }
  })

  // 🔋 BATTERY UPDATE TIMER
  useEffect(() => {
    const updateBattery = () => {
      const startTime = Number(sessionStorage.getItem("manos-session-start") || Date.now())
      const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000)
      const currentPct = Math.max(15, 100 - Math.floor(elapsedMinutes / 3))
      const charging = currentPct > 90 || elapsedMinutes < 2
      setBatteryState({ level: currentPct, charging })
    }

    updateBattery()
    const timer = setInterval(updateBattery, 30000)
    return () => clearInterval(timer)
  }, [])
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

  useEffect(() => {
    const handleClick = (event) => {
      if (rightRef.current && !rightRef.current.contains(event.target)) {
        setOpenStatus(null)
      }
    }

    document.addEventListener("mousedown", handleClick)
    document.addEventListener("touchstart", handleClick)

    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("touchstart", handleClick)
    }
  }, [])

  return (
    <div className="right" ref={rightRef}>
      {/* TIME (PRIMARY) */}
      <Status
        statusKey="time"
        primary
        text={time}
        title={date}
        sub={`Session #${visits}`}
        accent="#0a84ff"
        accentIcon="ri-time-fill"
        isOpen={openStatus === "time"}
        onToggle={setOpenStatus}
      />

      {/* VISITS */}
      <Status
        statusKey="visitors"
        icon="ri-user-line"
        text={visits}
        title="Visitors"
        sub={`${visits} total sessions`}
        accent="#ff9f0a"
        accentIcon="ri-group-fill"
        isOpen={openStatus === "visitors"}
        onToggle={setOpenStatus}
      />

      {/* WIFI */}
      <Status
        statusKey="wifi"
        icon="ri-wifi-line"
        title="Wi-Fi"
        sub="Connected"
        className="wifi"
        accent="#34c759"
        accentIcon="ri-wifi-fill"
        isOpen={openStatus === "wifi"}
        onToggle={setOpenStatus}
      />

      {/* BATTERY */}
      <Status
        statusKey="battery"
        icon={batteryState.charging ? "ri-battery-2-charge-line" : "ri-battery-line"}
        title="Battery"
        sub={batteryState.charging ? `Charging (${batteryState.level}%)` : `${batteryState.level}% - On Battery`}
        className="battery"
        accent={batteryState.level > 20 ? "#34c759" : "#ff3b30"}
        accentIcon={batteryState.charging ? "ri-battery-2-charge-fill" : "ri-battery-fill"}
        alignRight
        isOpen={openStatus === "battery"}
        onToggle={setOpenStatus}
      />
    </div>
  )
}

const Status = ({
  statusKey,
  icon,
  text,
  title,
  sub,
  primary,
  className = "",
  accent,
  accentIcon,
  alignRight,
  isOpen,
  onToggle,
}) => (
  <div
    className={`status-wrap ${primary ? "primary" : ""} ${alignRight ? "align-right" : ""} ${isOpen ? "open" : ""}`}
  >
    <button
      className={`status-btn ${className}`}
      onClick={(event) => {
        event.stopPropagation()
        onToggle(isOpen ? null : statusKey)
      }}
    >
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
