import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import Pomodoro from '../components/PomodoroUI'
import {Button} from 'react-bootstrap'
import {doStart, doPause, doInit} from '../redux/modules/pomodoro'


const Controls = ({onStartClick, onPauseClick, onResetClick, startDisabled}) =>
  <div>
    <Button onClick={onStartClick} disabled={startDisabled}>Start</Button>
    <Button onClick={onPauseClick} disabled={!startDisabled}>Pause</Button>
    <Button onClick={onResetClick} disabled={!startDisabled}>Reset</Button>
  </div>


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

  render() {
    const { work, rest } = this.props

    return (
      <div>
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
  doStart, doPause, doInit
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PomodoroContainer)
