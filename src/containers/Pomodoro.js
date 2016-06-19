import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import {Countdown} from '../components/PomodoroUI'


const PomodoroInterval = ({interval, onEnd}) =>
  <Countdown formatter="hh:mm" end={interval}  />



type Props = {

}
export class Pomodoro extends Component {
  props: Props;

  render() {
    const {

    } = this.props

    return (
      <div></div>
    )
  }
}

const mapStateToProps = ({Pomodoro}) => {
  const {} = Pomodoro
  return {}
}
const mapDispatchToProps = {
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pomodoro)
