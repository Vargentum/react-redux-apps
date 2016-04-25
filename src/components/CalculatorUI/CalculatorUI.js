import React, {PropTypes, Component} from 'react'
import Display from './Display'
import Keyboard from './Keyboard'

type Props = {
  queque:             PropTypes.array,
  calculationResult:  PropTypes.number,
  updateActiveNumber: PropTypes.func,
  doOperation:        PropTypes.func,
  doReset:            PropTypes.func,
  displayResult:      PropTypes.func,
  convertToFloat:     PropTypes.func
};

export class CalculatorUI extends Component {
  props: Props;

  render () {
    const {
      queque,
      calculationResult,
      updateActiveNumber,
      doOperation,
      doReset,
      convertToFloat
    } = this.props

    return (
      <div>
        <Display {...this.props} />
        <Keyboard {...this.props} />
      </div>
    )
  }
}

export default CalculatorUI

