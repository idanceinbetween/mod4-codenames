import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import MainCanvas from './containers/MainCanvas'
import { BrowserRouter as Prompt } from 'react-router-dom'

class App extends Component {
  state = {
    isBlocking: false
  }

  activateBlock = () => {
    this.setState({ isBlocking: true })
  }

  deactivateBlock = () => {
    this.setState({ isBlocking: false })
  }

  render() {
    const { isBlocking } = this.state

    return (
      <div className='App'>
        <NavBar />
        <MainCanvas
          activateBlock={() => this.activateBlock()}
          deactivateBlock={() => this.deactivateBlock()}
        />
        <Prompt
          when={isBlocking}
          message={'Are you sure you want to leave current game?'}
        />
      </div>
    )
  }
}

export default App
