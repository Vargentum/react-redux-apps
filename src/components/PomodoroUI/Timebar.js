import React, {Component, PropTypes} from 'react'

class Timebar extends Component {
  static propTypes = {}

  // state = {}
  // methodName = () =>
  //   <div></div>
    
  render() {
    const { color, height } = this.props
    /*style={{color, height}}*/

    return (
      <div className="pomodoro-timer">{height}</div>
    )
  }
}

export default Timebar
