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
import Note from './components/windows/Note'
import CodeEditor from './components/windows/CodeEditor'
import Camera from './components/windows/Camera'
import Gallery from './components/windows/Gallery'


const App = () => {
  return (
    <main>
      <Nav />
      <Dock />
      
      <Cli />
      <Spotify />
      <Pdf />
      <Calendar />
      <Github />
      <Mail />
      <Note />
      <CodeEditor />
      <Camera />
      <Gallery />
    </main>
  )
}

export default App
