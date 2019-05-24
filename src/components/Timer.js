import React, { Component } from "react";
import CountdownTimer from "react-component-countdown-timer";

class Timer extends Component {
  state = {
    count: 120,
    border: true,
    responsive: true,
    noPoints: false,
    hideDay: true,
    hideHours: true
  };
  render() {
    return (
      <div>
        <p>
          <b>Timer</b>
        </p>
        <p>
          <CountdownTimer {...this.state} />
        </p>
        {/* <p>lsdjflashkdjhajhfkjhsakfdhjkjh</p> */}
      </div>
    );
  }
}

export default Timer;
