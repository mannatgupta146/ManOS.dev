import React from 'react'
import './App.scss'
import Dock from './components/Dock'
import Nav from './components/Nav'
import Github from './components/windows/Github'
import Cli from './components/windows/Cli'
import Spotify from './components/windows/Spotify'


const App = () => {
  return (
    <main>
      <Nav />
      <Dock />
      <Github />
      <Cli />
      <Spotify />
    </main>
  )
}

export default App
