import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {start, pause, reset, update, setWorkInterval, setBreakInterval} from '../modules/Pomodoro'

export class Pomodoro extends Component {
  static propTypes = {
    start: PropTypes.func.isRequired
    pause: PropTypes.func.isRequired
    reset: PropTypes.func.isRequired
    update: PropTypes.func.isRequired
    setWorkInterval: PropTypes.func.isRequired
    setBreakInterval: PropTypes.func.isRequired
  }

  render() {
    const {
      start, pause, reset, update, setWorkInterval, setBreakInterval
    } = this.props

    return (
      <div>
        {workInterval}
        {breakInterval}

        {timer}
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
      </div>
    )
  }
}

const mapStateToProps = ({Pomodoro}) => {
  const {workInterval, breakInterval, timer} = Pomodoro
  return {}
}
const mapDispatchToProps = {
  start, pause, reset, update, setWorkInterval, setBreakInterval
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pomodoro)
