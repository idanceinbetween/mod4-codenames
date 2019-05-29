import React, { Component, Fragment } from 'react'

class Timer extends Component {
  state = {
    timer: this.props.timer,
    runTimer: this.props.runTimer
  }

  timer = () => {
    this.setState({
      timer: this.state.timer - 1
    })

    if (this.state.timer < 1) {
      // automatically updates time when team swaps
      clearInterval(this.intervalId)
      this.props.bomb()
      this.setState({ timer: this.props.timer })
      if (this.props.runTimer) {
        this.intervalId = setInterval(this.timer, 1000)
      }
    }
  }

  resetTimer = () => {
    clearInterval(this.intervalId)
    this.setState({ timer: this.props.timer })
    this.intervalId = setInterval(this.timer, 1000)
  }

  componentDidMount() {
    if (this.props.runTimer) {
      this.intervalId = setInterval(this.timer, 1000)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.activeTeam !== this.props.activeTeam &&
      this.state.timer > 0
    ) {
      this.resetTimer()
    } else if (
      prevProps.runTimer !== this.props.runTimer &&
      this.props.runTimer
    ) {
      this.intervalId = setInterval(this.timer, 1000)
    } else if (this.props.runTimer === false) {
      //when main app asks to pause timer
      clearInterval(this.intervalId)
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const { timer } = this.state
    return (
      <Fragment>
        <h2>Timer </h2>
        {this.state.timer > 3 && (
          <Fragment>
            <h1>
              {parseInt(timer / 60)}:
              {parseInt(timer % 60) < 10
                ? '0' + parseInt(timer % 60)
                : parseInt(timer % 60)}
            </h1>
          </Fragment>
        )}
        {this.state.timer <= 3 && (
          <Fragment>
            <h1 style={{ 'background-color': '#db2828', color: 'white' }}>
              {parseInt(timer / 60)}:
              {parseInt(timer % 60) < 10
                ? '0' + parseInt(timer % 60)
                : parseInt(timer % 60)}
            </h1>
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default Timer
