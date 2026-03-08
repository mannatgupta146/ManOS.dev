import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'remixicon/fonts/remixicon.css'

const bootstrapUiState = () => {
  document.body.classList.remove('dock-hidden')

  const savedSettings = JSON.parse(localStorage.getItem('ui-settings') || '{}')
  const hasSession = Boolean(sessionStorage.getItem('manos-session'))

  if (!hasSession && savedSettings.focusMode) {
    const nextSettings = { ...savedSettings, focusMode: false }
    localStorage.setItem('ui-settings', JSON.stringify(nextSettings))
    document.body.classList.remove('focus-mode')
    return
  }

  document.body.classList.toggle('focus-mode', Boolean(savedSettings.focusMode))
}

bootstrapUiState()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
