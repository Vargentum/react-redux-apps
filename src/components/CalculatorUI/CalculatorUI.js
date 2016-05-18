import React, {PropTypes, Component} from 'react'
import {Row, Col} from 'react-bootstrap'
import Display from './Display'
import Keyboard from './Keyboard'

class HelpTexts extends Component {

  r_item = (txt) =>
    <li>{txt}</li>

  render() {
    const texts = [
      'Keyboard is supported',
      'Hold cursor over button to display keyboard shortcut',
      'Hit Enter to get result',
      'Hit Space to reset'
    ]

    return (
      <div>
        <h3>Help info</h3>
        <ul>
          {texts.map(this.r_item)}
        </ul>
      </div>
    )
  }
}

export class CalculatorUI extends Component {
  static propTypes = {
    queque:             PropTypes.array,
    calculationResult:  PropTypes.number,
    updateActiveNumber: PropTypes.func,
    doOperation:        PropTypes.func,
    doReset:            PropTypes.func,
    displayResult:      PropTypes.func,
    convertToFloat:     PropTypes.func
  }

  render () {
    return (
      <Row>
        <Col xs="12" sm="6" md="3">
          <Display {...this.props} />
          <Keyboard {...this.props} />
        </Col>
        <Col xs="12">
          <HelpTexts />
        </Col>
      </Row>
    )
  }
}

export default CalculatorUI

