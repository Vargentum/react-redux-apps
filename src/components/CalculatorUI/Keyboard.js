import React, {PropTypes, Component} from 'react'
import {Button} from 'react-bootstrap'

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
      type: 'result'
    },
    reset: {
      label: 'C',
      code: [67, 32],
      type: 'reset'
    },
    sum: {
      label: '+',
      code: [107, {code: 187, metakeys: {
        shiftKey: true
      }}],
      type: 'operation'
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
      type: 'operation'
    },
    divide: {
      label: '/',
      code: [111, {code: 191, metakeys: {
        shiftKey: true
      }}],
      type: 'operation'
    }
  }

  mapActionsToButtons = (btn, name) => {
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
    actionedButtons: _.map(Keyboard.buttons, this.mapActionsToButtons)
  }

  r_button = ({label, action}) => <li 
    key={_.uniqueId('btn-')}>
      <Button onClick={action}>{label}</Button>
    </li>

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
    const pressedBtn = _.findLast(this.state.actionedButtons, getPressedBtn)
    if (pressedBtn) pressedBtn.action(pressedBtn.label)
  }

  componentDidMount () {
    document.addEventListener('keyup', this.addKeyboardSupport.bind(this))
  }

  componentWillUnmount () {
    document.removeEventListener('keyup', this.addKeyboardSupport)
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
        {this.state.actionedButtons.map(this.r_button)}
      </div>
    )
  }
}

export default Keyboard
