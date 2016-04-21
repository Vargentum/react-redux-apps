import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
const UPDATE_NUMBER = 'update active number'
const DO_OPERATION = 'perform calculation operation'
const DO_RESET = 'calculator reset'
const CONVERT_TO_FLOAT = 'convert active number to float'

const OPERATORS = {
  plus: {
    operate: (i1,i2) => i1 + i2,
    name: '+'
  },
  minus: {
    operate: (i1,i2) => i1 - i2,
    name: '-'
  },
  multiple: {
    operate: (i1,i2) => i1 * i2,
    name: '*'
  },
  divide: {
    operate: (i1,i2) => i1 / i2,
    name: '/'
  }
}

// ------------------------------------
// History
// ------------------------------------
class Calculator {
  static initState = [0]

  constructor(initQueque = Calculator.initState) {
    this._queque = initQueque
  }
  _isOperator = (entry) => !!OPERATORS[entry]
  _isNumber = (entry) =>    !OPERATORS[entry]
  _getOperations = () => this._queque.filter(this._isOperator)
  _getNumbers = () =>    this._queque.filter(this._isNumber)
  _updateEntry = (oVal, nVal) => {
    console.log(oVal, nVal)
    switch (oVal) {
      case 0: return nVal
      default: return parseInt('' + oVal + nVal)
    }
  }
  addCharacter(char) {
    const lastEntry = _.last(this._queque)
    this._isOperator(char) || this._isOperator(lastEntry)
      ? this._queque.push(char)
      : this._queque.splice(-1, 1, this._updateEntry(lastEntry, char))
  }
  isReadyToCalculate() {
    return this._getOperations().length > 0
           && this._getNumbers().length > 1
  }
  isValidExpression(o1, op, o2) {
    return this._isOperator(op) 
           && typeof o1 === 'number' 
           && typeof o2 === 'number'
  }
  calculateExpression(o1, op, o2) {
    return OPERATORS[op].operate(o1, o2)
  }
  calculateResult() {
    return this._queque.reduce((result, entry, idx, history) => {
      const [o1, o2] = [history[idx - 1], history[idx + 1]]
      return this.isValidExpression(o1, entry, o2)
        ? result = this.calculateExpression(o1, entry, o2)
        : result
    }, 0)
  }
  getLastCalculatedValue() {
    return _.findLast(this._queque, this._isNumber)
  }
  getQueque() {
    return this._queque.join(' ')
  }
  reset() {
    this._queque = Calculator.initState
  }
}
const Calc = new Calculator()

// ------------------------------------
// Actions
// ------------------------------------
export const updateActiveNumber = (integer) => ({
  type: UPDATE_NUMBER,
  payload: integer
})
export const doOperation = (operationType) => ({
  type: DO_OPERATION,
  payload: operationType
})
export const doReset = () => ({
  type: DO_RESET,
  payload: null
})
export const convertToFloat = () => ({
  type: CONVERT_TO_FLOAT,
  payload: null
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_NUMBER]: (state, {payload}) => {
    Calc.addCharacter(payload)
    const calculationResult = Calc.getLastCalculatedValue()
    const queque = Calc.getQueque()
    return Object.assign({}, state, {calculationResult, queque})
  },
  [DO_OPERATION]: (state, {payload}) => {
    Calc.addCharacter(payload)
    const calculationResult = Calc.isReadyToCalculate()
      ? Calc.calculateResult()
      : Calc.getLastCalculatedValue()
    const queque = Calc.getQueque()
    return Object.assign({}, state, {calculationResult, queque})
  },
  [DO_RESET]: () => {
    Calc.reset()
    Object.assign({}, initialState)
  }
}


// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  queque: [],
  calculationResult: 0
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
