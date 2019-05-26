import React, { Component } from 'react'

class Timer extends Component {
  state = {
    timer: this.props.timer
  }

  timer = () => {
    this.setState({
      timer: this.state.timer - 1
    })

    if (this.state.timer < 1) {
      clearInterval(this.intervalId)
      this.props.bomb()
      this.setState({ timer: this.props.timer })
      this.intervalId = setInterval(this.timer, 1000)
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const { timer } = this.state
    const { activeTeam } = this.props
    return (
      <div>
        <p>
          <b>Team {activeTeam}, you're up!</b>
        </p>
        <p>
          <b>Timer</b>
        </p>
        <p>
          {parseInt(timer / 60)}:
          {parseInt(timer % 60) < 10
            ? '0' + parseInt(timer % 60)
            : parseInt(timer % 60)}
        </p>
      </div>
    )
  }
}

export default Timer
