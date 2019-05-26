import React, { Component } from 'react'
// import CountdownTimer from "react-component-countdown-timer"

class Timer extends Component {
  state = {
    timer: this.props.timer
    // count: 120,
    // border: true,
    // responsive: true,
    // noPoints: false,
    // hideDay: true,
    // hideHours: true
  }

  timer = () => {
    this.setState({
      timer: this.state.timer - 1
    })

    if (this.state.timer < 1) {
      clearInterval(this.intervalId)
      this.props.bomb()
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // debugger;
  //   if (nextState.timer === 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   this.setState({ timer: this.props.timer });
  //   this.intervalId = setInterval(this.timer, 1000);
  // }

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
