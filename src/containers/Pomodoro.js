import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {applyToTimer, onTimerComplete, update, setWorkInterval, setBreakInterval} from '../redux/modules/Pomodoro'
import Tock from 'tocktimer'
import Countdown from '../components/PomodoroUI/Countdown'
import {Input} from "react-bootstrap"


const minToMs = (min) => min * 60 * 1000

export class Pomodoro extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    setWorkInterval: PropTypes.func.isRequired,
    setBreakInterval: PropTypes.func.isRequired
  }

  state = {
    isBreakTime: false,
    updateScheduler: null
  }

  componentDidMount() {
    this.initPomodoroCycle()
    this.syncTime(true)
  }

  componentWillUnmount() {
    this.syncTime(false)
  }

  syncTime = (state) => {
    this.setState({
      updateScheduler: state 
        ? setInterval(this.props.update, 1000) 
        : clearInterval(this.state.updateScheduler)
    });
  }

  toggleBreakTime = (cb) => this.setState({
    isBreakTime: !this.state.isBreakTime 
  }, cb);

  timerRestart = (time) => {
    this.props.applyToTimer('pause')
    this.props.applyToTimer('start', minToMs(time))
  }

  timerReset = (time) => {
    this.props.applyToTimer('start', minToMs(time))
    this.props.applyToTimer('pause')
  }

  switchPomodoroTimers = (bp, wI, bI) => () => {
    return bp ? this.timerReset(wI) : this.timerRestart(bI)
  }

  initPomodoroCycle = () => {
    const {update, breakInterval, workInterval} = this.props
    this.timerReset(workInterval)
    this.props.onTimerComplete(() => {
      this.toggleBreakTime(this.switchPomodoroTimers(this.state.isBreakTime, workInterval, breakInterval))
    })
  }

  r_input = (action, value, label) => {
    const handleInputChangeWith = (handler) => (ev) => handler(ev.target.value)
    return <Input type="number" value={value} onChange={handleInputChangeWith(action)} label={label} />
  }

  render() {
    const {
      applyToTimer, update, setWorkInterval, setBreakInterval, 
      workInterval, breakInterval, time
    } = this.props

    return (
      <div>
        {this.r_input(setWorkInterval, workInterval, "Work Interval")}
        {this.r_input(setBreakInterval, breakInterval, "Break Interval")}
        <Countdown time={time} />
        <button onClick={() => applyToTimer('start', minToMs(workInterval))}>Start</button>
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
