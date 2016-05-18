import React, {PropTypes, Component} from 'react'
import {Button, Col, OverlayTrigger, Tooltip} from 'react-bootstrap'
import styles from "../../styles/Calculator.styl"

type Props = {
  updateActiveNumber: PropTypes.func,
  doOperation:        PropTypes.func,
  doReset:            PropTypes.func,
  displayResult:      PropTypes.func,
  convertToFloat:     PropTypes.func
};


export class Keyboard extends Component {
  props: Props;

  static buttons = { //TIP: move down items with specific codes
    zero: {
      label: '0',
      code: 48,
      type: 'number'
    },
    one: {
      label: '1',
      code: 49,
      type: 'number'
    },
    two: {
      label: '2',
      code: 50,
      type: 'number'
    },
    three: {
      label: '3',
      code: 51,
      type: 'number'
    },
    four: {
      label: '4',
      code: 52,
      type: 'number'
    },
    five: {
      label: '5',
      code: 53,
      type: 'number'
    },
    six: {
      label: '6',
      code: 54,
      type: 'number'
    },
    seven: {
      label: '7',
      code: 55,
      type: 'number'
    },
    eight: {
      label: '8',
      code: 56,
      type: 'number'
    },
    nine: {
      label: '9',
      code: 57,
      type: 'number'
    },
    result: {
      label: '=',
      code: [187, 13],
      type: 'result',
      tip: "Press = or Enter"
    },
    reset: {
      label: 'C',
      code: [67, 32],
      type: 'reset',
      tip: 'Press C or Space'
    },
    sum: {
      label: '+',
      code: [107, {code: 187, metakeys: {
        shiftKey: true
      }}],
      type: 'operation',
      tip: 'Press shift-+'
    },
    substract: {
      label: '-',
      code: [109, 189],
      type: 'operation'
    },
    multiple: {
      label: '*',
      code: [106, {code: 56, metakeys: {
        shiftKey: true
      }}],
      type: 'operation',
      tip: 'Press shift-8'
    },
    divide: {
      label: '/',
      code: [111, {code: 191}],
      type: 'operation'
    }
  }

  integrateActionToButton = (btn, name) => {
    const {updateActiveNumber, doOperation, doReset, displayResult, convertToFloat} = this.props
    const {label, type} = btn
    let action = null
    switch (type) {
      case 'number'    : action = _.partial(updateActiveNumber, label)
      break;
      case 'operation' : action = _.partial(doOperation, name)
      break;
      case 'reset'     : action = doReset
      break;
      case 'result'    : action = displayResult
      break;
    }
    return _.assign({}, btn, {action})
  }

  state = {
    buttonsWithActions: _.mapValues(Keyboard.buttons, this.integrateActionToButton),
    layout: [
      ['one', 'two', 'three', 'divide'],
      ['four', 'five', 'six', 'multiple'],
      ['seven', 'eight', 'nine', 'substract'],
      ['reset', 'zero', 'result', 'sum']
    ]
  }
  
  addKeyboardSupport (ev) {
    const isEventKeyCode = (val) => val === ev.keyCode
    const getPressedBtn = ({code}) => {
      if (!code.length) return isEventKeyCode(code)
      return _.find(code, (item) => {
        return _.isObject(item) 
          ? _.every(item.metakeys, (v,k) => ev[k]) && isEventKeyCode(item.code)
          : isEventKeyCode(item)
      })
    }
    const pressedBtn = _.findLast(this.state.buttonsWithActions, getPressedBtn)
    if (pressedBtn) pressedBtn.action(pressedBtn.label)
  }

  componentDidMount () {
    document.addEventListener('keyup', this.addKeyboardSupport.bind(this))
  }

  componentWillUnmount () {
    document.removeEventListener('keyup', this.addKeyboardSupport)
  }

  getButtonStyle =  (type) => {
    switch (type) {
      case 'number'    : return 'primary'
      case 'operation' : return 'info'
      case 'reset'     : return 'danger'
      case 'result'    : return 'success'
    }
  }

  r_buttonTip = (text) => <Tooltip id={_.uniqueId('tip-')}>{text}</Tooltip>

  r_button = ({label, action, type, tip}) => <li 
    key={_.uniqueId('btn-')}>
      <OverlayTrigger placement="top" overlay={this.r_buttonTip(tip || label)} delayShow={1000}>
        <Button onClick={action} 
                bsSize="large"
                bsStyle={this.getButtonStyle(type)}
                className={styles.keyboardBtn}>{label}</Button>
      </OverlayTrigger>
    </li>

  r_buttonsRow = (row) => <ul
    className="util-list_reset f-box"
    key={_.uniqueId('row-')}>
      {_.map(row, (name) => this.r_button(this.state.buttonsWithActions[name]))}
    </ul>

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
        {_.map(this.state.layout, this.r_buttonsRow)}
      </div>
    )
  }
}

export default Keyboard
