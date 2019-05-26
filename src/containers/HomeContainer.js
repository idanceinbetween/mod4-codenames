import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import HowToPlay from '../components/HowToPlay'
import StartPlay from '../components/StartPlay'

class HomeContainer extends Component {
  state = {
    startGame: false
  }
  render() {
    return (
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <HowToPlay />
          </Grid.Column>
          <Grid.Column>
            <StartPlay />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default HomeContainer
