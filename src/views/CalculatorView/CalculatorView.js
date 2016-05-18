import React from 'react'
import Calculator from '../../containers/Calculator'
import CommonView from '../CommonView'

class CalculatorView extends React.Component {
  render () {
    return (
      <CommonView
        title="Javascript Calculator"
        description="App that allows calculations."
        criteriaUrl="https://www.freecodecamp.com/challenges/build-a-javascript-calculator"
        sourceCodeUrl="https://github.com/Vargentum/react-redux-apps/tree/calculator"
        Component={Calculator}
      />
    )
  }
}

export default CalculatorView
