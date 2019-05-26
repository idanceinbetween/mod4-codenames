import React, { useContext } from 'react'
import './App.css'
// import { Route, Switch, __RouterContext } from 'react-router-dom'
// import { useTransition, animated } from 'react-spring'
import NavBar from './components/NavBar'

import MainCanvas from './containers/MainCanvas'
// import About from './components/About'
// import HomeContainer from './containers/HomeContainer'
// import GameContainer from './containers/GameContainer'

const App = () => {
  // const { location } = useContext(__RouterContext)

  // const transitions = useTransition(location, location => location.pathname, {
  //   from: { opacity: 0, transform: 'translate(100%, 0)' },
  //   enter: { opacity: 1, transform: 'translate(0, 0)' },
  //   leave: { opacity: 0, transform: 'translate(-50%, 0)' }
  // })

  return (
    <div className='App'>
      <NavBar />
      <MainCanvas />
    </div>
  )
}

export default App
