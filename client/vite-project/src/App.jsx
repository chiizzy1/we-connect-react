import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Welcome from './components/Welcome'

function App() {

  return (
    <div className="App">
      <Welcome />
      <Home />
    </div>
  )
}

export default App
