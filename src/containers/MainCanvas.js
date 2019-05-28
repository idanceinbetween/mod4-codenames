import React, { useContext } from 'react'
import { Route, Switch, __RouterContext } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'

import About from '../components/About'
import HomeContainer from './HomeContainer'
import GameContainer from './GameContainer'
import WordManager from '../components/WordManager'

const MainCanvas = () => {
  const { location } = useContext(__RouterContext)

  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: 'translate(100%, 0)' },
    enter: { opacity: 1, transform: 'translate(0, 0)' },
    leave: { opacity: 0, transform: 'translate(-50%, 0)' }
  })

  return (
    <div>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={item}>
            <Route exact path='/' component={HomeContainer} />
            <Route exact path='/games' component={GameContainer} />
            <Route exact path='/about' render={About} />
            <Route exact path='/wordman' component={WordManager} />
            <Route
              component={() => (
                <h1>
                  404 Not Found and this is shown in the (APP's second half)
                </h1>
              )}
            />
          </Switch>
        </animated.div>
      ))}
    </div>
  )
}

export default MainCanvas
