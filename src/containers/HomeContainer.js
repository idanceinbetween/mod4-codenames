import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import HowToPlay from '../components/HowToPlay'
import StartPlay from '../components/StartPlay'
import AbsoluteWrapper from '../components/AbsoluteWrapper'

class HomeContainer extends Component {
  state = {
    startGame: false
  }
  componentDidMount() {
    this.props.deactivateBlock()
  }
  render() {
    return (
      <AbsoluteWrapper>
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
      </AbsoluteWrapper>
    )
  }
}

export default HomeContainer
