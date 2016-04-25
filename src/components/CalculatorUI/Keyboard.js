import React, {PropTypes, Component} from 'react'
import {Button} from 'react-bootstrap'
import {OPERATORS} from '../../redux/modules/Calculator'

const [sum, substract, multiple, divide] = Object.keys(OPERATORS)

type Props = {
  updateActiveNumber: PropTypes.func,
  doOperation:        PropTypes.func,
  doReset:            PropTypes.func,
  displayResult:      PropTypes.func,
  convertToFloat:     PropTypes.func
};

export class Keyboard extends Component {
  props: Props;

  static layout = [
    [1,2,3,divide],
    [4,5,6,multiple],
    [7,8,9,substract],
    ['C', 0, '=', sum]
  ]

  r_operationBtn = (type) => <Button 
    onClick={_.partial(this.props.doOperation, type)}>
      {OPERATORS[type].name}
    </Button>

  r_numberBtn = (type) => <Button 
    onClick={_.partial(this.props.updateActiveNumber, type)}>
      {type}
    </Button>

  r_resultBtn = (type) => <Button 
    onClick={this.props.displayResult}>
      {type}
    </Button>

  r_resetBtn = (type) => <Button 
    onClick={this.props.doReset}>
      {type}
    </Button>

  r_button = (type) => {
    return <li key={_.uniqueId('btn-')}>
      {typeof type === 'number' ? this.r_numberBtn(type) : null}
      {OPERATORS[type] ? this.r_operationBtn(type) : null}
      {type === '=' ? this.r_resultBtn(type) : null}
      {type === 'C' ? this.r_resetBtn(type) : null}
    </li>
  }

  r_buttonsSet = (set) => {
    return <ul className="f-box f-gap--M" key={_.uniqueId('set-')}>
      {set.map(this.r_button)}
    </ul>
  }

  render () {
    const {
      updateActiveNumber,
      doOperation,
      doReset,
      displayResult,
      convertToFloat
    } = this.props

    return (
      <div>
        {Keyboard.layout.map(this.r_buttonsSet)}
      </div>
    )
  }
}

export default Keyboard

