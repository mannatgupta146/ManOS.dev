import React from 'react'
import './App.scss'
import Dock from './components/Dock'
import Nav from './components/Nav'
import Github from './components/windows/Github'
import Cli from './components/windows/Cli'


const App = () => {
  return (
    <main>
      <Nav />
      <Dock />
      <Github />
      <Cli />
    </main>
  )
}

export default App
