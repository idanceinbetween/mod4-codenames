import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class StartPlay extends Component {
  state = {
    name: ''
  }

  trackName = name => {
    this.setState({ name })
  }

  goToStart = () => {
    alert('Need to write transition and action')
    console.log(`State has the first username: ${this.state.name}`)
  }

  render() {
    return (
      <div>
        <p>Ready to play?</p>
        <Input
          onChange={e => this.trackName(e.target.value)}
          placeholder='Enter your name to start'
        />
        <br />
        <Link to='/games'>
          <Button>Submit</Button>
        </Link>
      </div>
    )
  }
}

export default StartPlay
