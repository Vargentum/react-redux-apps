import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {applyToTimer, update, setWorkInterval, setBreakInterval} from '../redux/modules/Pomodoro'
import Tock from 'tocktimer'

export class Pomodoro extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    setWorkInterval: PropTypes.func.isRequired,
    setBreakInterval: PropTypes.func.isRequired
  }

  componentDidMount() {
    setInterval(this.props.update, 1000)
  }

  render() {
    const {
      applyToTimer, update, setWorkInterval, setBreakInterval, 
      workInterval, breakInterval, time
    } = this.props
    const timer = new Tock()

    return (
      <div>
        {time}
        <button onClick={() => applyToTimer('start', timer.timeToMS(workInterval))}>Start</button>
        <button onClick={() => applyToTimer('pause')}>Pause</button>
      </div>
    )
  }
}

const mapStateToProps = ({pomodoro}) => {
  const {workInterval, breakInterval, time} = pomodoro
  return {workInterval, breakInterval, time}
}
const mapDispatchToProps = {
  applyToTimer, update, setWorkInterval, setBreakInterval
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pomodoro)
