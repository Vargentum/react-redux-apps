import React, {PropTypes, Component} from 'react'
import Pomodoro from 'containers/Pomodoro'
import CommonView from 'views/CommonView'

type Props = {

};
export class PomodoroView extends Component {
  props: Props;

  render () {
    return (
      <CommonView
        title="Pomodoro Timer"
        description="Simple apps that implement timers for Pomodoro technique"
        criteriaUrl="https://www.freecodecamp.com/challenges/build-a-pomodoro-clock"
        sourceCodeUrl="https://github.com/Vargentum/react-redux-apps/tree/new-pomodoro"
        Component={Pomodoro}
      />
    )
  }
}

export default PomodoroView
