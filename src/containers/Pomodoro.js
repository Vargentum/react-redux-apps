import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import Pomodoro from '../components/PomodoroUI'
import {Button} from 'react-bootstrap'
import {doStart, doPause, doReset} from '../redux/modules/pomodoro'


const Controls = ({onStartClick, onPauseClick, onStopClick, startDisabled}) =>
  <div>
    <Button onClick={onStartClick} disabled={startDisabled}>Start</Button>
    <Button onClick={onPauseClick} disabled={!startDisabled}>Pause</Button>
    <Button onClick={onStopClick} disabled={!startDisabled}>Stop</Button>
  </div>


type Props = {
  work: Object,
  rest: Object
}
export class PomodoroContainer extends Component {
  props: Props;

  handleWorkStart() {

  }

  handleWorkEnd() {

  }

  getPomodoroTypeBasedOn(prop){
    return this.props.work[prop] ? 'work' : 'rest'
  }

  generateControlsProps({doStart, doPause, doReset, work, rest}) {
    return {
      onStartClick: () => doStart(this.getPomodoroTypeBasedOn('active')),
      onPauseClick: () => doPause(this.getPomodoroTypeBasedOn('active')),
      onStopClick:  () => doReset(this.getPomodoroTypeBasedOn('active')),
      startDisabled: this.props[this.getPomodoroTypeBasedOn('active')].inProgress
    }
  }

  render() {
    const { work, rest } = this.props

    return (
      <div>
        <Pomodoro onEnd={this.handleWorkEnd} {...work} />
        <Pomodoro onEnd={this.handleBreakEnd} {...rest} />
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
  doStart, doPause, doReset
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PomodoroContainer)
