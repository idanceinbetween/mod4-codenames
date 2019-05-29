import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import HowToPlay from '../components/HowToPlay'
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
          <Grid.Row columns={3}>
            <Grid.Column width={3} />
            <Grid.Column width={10}>
              <HowToPlay />
            </Grid.Column>
            <Grid.Column width={3} />
          </Grid.Row>
        </Grid>
      </AbsoluteWrapper>
    )
  }
}

export default HomeContainer
