import React from 'react'
import './App.scss'
import Dock from './components/Dock'
import Nav from './components/Nav'
import Github from './components/windows/Github'
import Cli from './components/windows/Cli'
import Spotify from './components/windows/Spotify'
import Pdf from './components/windows/Pdf'
import Calendar from './components/windows/Calendar'
import Mail from './components/windows/Mail'


const App = () => {
  return (
    <main>
      <Nav />
      <Dock />
      <Github />
      <Cli />
      <Spotify />
      <Pdf />
      <Calendar />
      <Mail />
    </main>
  )
}

export default App
