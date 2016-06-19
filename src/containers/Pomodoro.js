import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Pomodoro, Controls, DurationSetup} from '../components/PomodoroUI'
import {doStart, doPause, doInit, updateDuration} from '../redux/modules/pomodoro'
import {pomodoroContainer} from 'styles/Pomodoro'

type Props = {
  work: Object,
  rest: Object
}
class PomodoroContainer extends Component {
  props: Props;

  handleRestEnd = () => {
    const {doInit} = this.props
    doInit('work')
  }

  handleWorkEnd = () => {
    const {doStart, doInit} = this.props
    doInit('rest')
    doStart('rest')
  }

  getPomodoroTypeBasedOn(prop) {
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
      <div className={`f-box f-align--13-2 f-dir--col ${pomodoroContainer}`}>
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
