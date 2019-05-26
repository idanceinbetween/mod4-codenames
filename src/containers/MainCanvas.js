import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import About from '../components/About'
import HomeContainer from './HomeContainer'
import GameContainer from './GameContainer'

class MainCanvas extends Component {
  state = {}
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={HomeContainer} />
          <Route exact path='/games' component={GameContainer} />
          <Route exact path='/about' render={About} />
          <Route
            component={() => (
              <h1>404 Not Found and this is shown in the main canvas</h1>
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default MainCanvas
