import React, { useState, useCallback } from "react"
import "./NotificationCenter.scss"

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([])

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const addNotification = useCallback(
    (notification) => {
      const id = Date.now()
      const newNotif = {
        id,
        title: notification.title || "Notification",
        message: notification.message,
        type: notification.type || "info",
      }

      setNotifications((prev) => [newNotif, ...prev])

      // Auto-dismiss after duration (default 8 seconds)
      const duration = notification.duration || 8000
      setTimeout(() => {
        removeNotification(id)
      }, duration)

      return id
    },
    [removeNotification],
  )

  // Register global notification system
  React.useEffect(() => {
    window.notify = addNotification
    return () => {
      delete window.notify
    }
  }, [addNotification])

  return (
    <div className="notification-container">
      {notifications.map((notif) => (
        <div key={notif.id} className={`notification-toast ${notif.type}`}>
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
