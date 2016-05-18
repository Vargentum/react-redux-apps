import React from 'react'
import Pomodoro from '../../containers/Pomodoro'
import CommonView from '../CommonView'

export class PomodoroView extends React.Component {
  render () {
    return (
      <CommonView
        title="FreeCodeCamp Pomodoro  Timer"
        description="Timer that allows pomodoro technique"
        criteriaUrl="https://www.freecodecamp.com/challenges/build-a-pomodoro-clock"
        sourceCodeUrl="https://github.com/Vargentum/react-redux-apps/tree/pomodoro"
        Component={Pomodoro}
      />
    )
  }
}

export default PomodoroView
