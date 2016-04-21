import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {updateActiveNumber, doOperation, doReset, convertToFloat} from '../redux/modules/Calculator'
import {CalculatorUI} from '../components/CalculatorUI/CalculatorUI'

export class Calculator extends Component {
  render() {
    return (
      <CalculatorUI {...this.props} />
    )
  }
}

const mapStateToProps = ({calculator}) => {
  const {queque, calculationResult} = calculator
  return {queque, calculationResult}
}
const mapDispatchToProps = {
  updateActiveNumber,
  doOperation,
  doReset,
  convertToFloat
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator)
