import React from 'react'
import './App.css'
import NavBar from './components/NavBar'

import MainCanvas from './containers/MainCanvas'

const App = () => {
  return (
    <div className='App'>
      <NavBar />
      <MainCanvas />
    </div>
  )
}

export default App
