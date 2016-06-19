import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import Pomodoro from '../components/PomodoroUI'
import {Button} from 'react-bootstrap'
import {doStart, doPause, doInit, updateDuration} from '../redux/modules/pomodoro'
import moment from 'moment'


const Controls = ({onStartClick, onPauseClick, onResetClick, startDisabled}) =>
  <div>
    <Button onClick={onStartClick} disabled={startDisabled}>Start</Button>
    <Button onClick={onPauseClick} disabled={!startDisabled}>Pause</Button>
    <Button onClick={onResetClick} disabled={!startDisabled}>Reset</Button>
  </div>

const DurationSetup = ({onChange, durations: {work, rest}}) => {
  const handleChange = (type) => ({currentTarget: {value}}) => {
    const ms = moment.duration(parseInt(value), 'm').asMilliseconds()
    onChange(ms, type)
  }
  return (
    <form>
      <input 
        type="number" step="1" min="15" max="75" 
        value={moment.duration(work, 'ms').asMinutes()} 
        onChange={handleChange('work')} />
      <input 
        type="number" step="1" min="1" max="25" 
        value={moment.duration(rest, 'ms').asMinutes()} 
        onChange={handleChange('rest')} />
    </form>
  )
}


type Props = {
  work: Object,
  rest: Object
}
export class PomodoroContainer extends Component {
  props: Props;

  handleRestEnd = () => {
    const {doStart, doInit} = this.props
    doInit('work')
  }

  handleWorkEnd = () => {
    const {doStart, doInit} = this.props
    doInit('rest')
    doStart('rest')
  }

  getPomodoroTypeBasedOn(prop){
    return this.props.work[prop] ? 'work' : 'rest'
  }

  generateControlsProps({doStart, doPause, doInit, work, rest}) {
    return {
      onStartClick: () => doStart(this.getPomodoroTypeBasedOn('active')),
      onPauseClick: () => doPause(this.getPomodoroTypeBasedOn('active')),
      onResetClick: () => doInit('work'),
      startDisabled:this.props[this.getPomodoroTypeBasedOn('active')].inProgress
    }
  }

  onDurationChange = (duration, type) => {

  }

  render() {
    const { work, rest, updateDuration } = this.props
    const durations = {
      work: work.duration,
      rest: rest.duration
    }
    return (
      <div>
        <DurationSetup onChange={updateDuration} durations={durations} />
        <Pomodoro theme="work" onEnd={this.handleWorkEnd} {...work} />
        <Pomodoro theme="rest" onEnd={this.handleRestEnd} {...rest} />
        <Controls {...this.generateControlsProps(this.props)} />
      </div>
    )
  }
}

const mapStateToProps = ({pomodoro}) => {
  const {work, rest} = pomodoro
  return {work, rest}
}
const mapDispatchToProps = {
  doStart, doPause, doInit, updateDuration
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PomodoroContainer)
