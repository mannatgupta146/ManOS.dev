import React, { useState, useCallback, useRef } from "react"
import "./NotificationCenter.scss"

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([])
  const notificationIdRef = useRef(0)

  const removeNotification = useCallback((id) => {
    // mark as removing first
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, removing: true } : n)),
    )

    // remove after animation
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 300) // match CSS animation duration
  }, [])

  const addNotification = useCallback(
    (notification) => {
      notificationIdRef.current += 1
      const id = `notif-${Date.now()}-${notificationIdRef.current}`

      const newNotif = {
        id,
        title: notification.title || "Notification",
        message: notification.message,
        type: notification.type || "info",
        removing: false,
      }

      setNotifications((prev) => [newNotif, ...prev])

      const duration = notification.duration ?? 8000

      setTimeout(() => {
        removeNotification(id)
      }, duration)

      return id
    },
    [removeNotification],
  )

  React.useEffect(() => {
    window.notify = addNotification
    return () => {
      delete window.notify
    }
  }, [addNotification])

  return (
    <div className="notification-container">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`notification-toast ${notif.type} ${
            notif.removing ? "removing" : ""
          }`}
        >
          <div className="notification-body">
            <p className="notification-title">{notif.title}</p>
            {notif.message && (
              <p className="notification-message">{notif.message}</p>
            )}
          </div>
          <button
            className="notification-close-btn"
            onClick={() => removeNotification(notif.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export default NotificationCenter
