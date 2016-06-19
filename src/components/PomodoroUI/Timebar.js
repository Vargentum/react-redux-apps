import React, {Component, PropTypes} from 'react'

class Timebar extends Component {
  static propTypes = {}

  // state = {}
  // methodName = () =>
  //   <div></div>
    
  render() {
    const { color, height } = this.props

    return (
      <div style={{color, height}} class="pomodoro-timer" />
    )
  }
}

export default Timebar
