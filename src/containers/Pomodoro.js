import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {applyToTimer, onTimerComplete, update, setWorkInterval, setBreakInterval} from '../redux/modules/Pomodoro'
import Tock from 'tocktimer'
import Countdown from '../components/PomodoroUI/Countdown'

export class Pomodoro extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    setWorkInterval: PropTypes.func.isRequired,
    setBreakInterval: PropTypes.func.isRequired
  }

  state = {
    isBreakTime: false,
    converter: new Tock()
  }

  componentDidMount() {
    const {breakInterval, workInterval} = this.props
    setInterval(this.props.update, 1000)
    this.props.onTimerComplete(() => {
      this.toggleBreakTime(
        this.timerRestart(this.state.isBreakTime ? breakInterval : workInterval)
      )
    })
  }

  toggleBreakTime = (cb) => this.setState({
    isBreakTime: !this.state.isBreakTime 
  }, cb);

  timerRestart = (time) => () => {
    this.props.applyToTimer('pause')
    this.props.applyToTimer('start', this.state.converter.timeToMS(time))
  }

  render() {
    const {
      applyToTimer, update, setWorkInterval, setBreakInterval, 
      workInterval, breakInterval, time
    } = this.props

    console.log(this.state.isBreakTime)

    return (
      <div>
        {
          this.state.isBreakTime 
            ? <Countdown time={time}>Break</Countdown>
            : <Countdown time={time}>Work</Countdown>
        }
        <button onClick={() => applyToTimer('start', this.state.converter.timeToMS(workInterval))}>Start</button>
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
  applyToTimer, onTimerComplete, update, setWorkInterval, setBreakInterval
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pomodoro)
