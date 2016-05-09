import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
const UPDATE_NUMBER = 'update active number'
const DO_OPERATION = 'perform calculation operation'
const DO_RESET = 'calculator reset'
const CONVERT_TO_FLOAT = 'convert active number to float'
const DISPLAY_RESULT = 'display calculation result'

export const OPERATORS = {
  sum: {
    operate: (i1,i2) => i1 + i2,
    name: '+',
  },
  substract: {
    operate: (i1,i2) => i1 - i2,
    name: '-',
  },
  multiple: {
    operate: (i1,i2) => i1 * i2,
    name: '*',
    priority: 1
  },
  divide: {
    operate: (i1,i2) => i1 / i2,
    name: '/',
    priority: 1
  }
}
const OPERATOR_PRIORITIES = [1]

// ------------------------------------
// ------------------------------------
export class AddableNumber {
  static initState = 0

  constructor(num = AddableNumber.initState) {
    this._val = num
  }
  _isFloat() {
    return parseInt(this._val) === this._val
  }
  add(num) {
    switch (this._val) {
      case 0: this._val = '' + num
      break
      default: this._val += '' + num
    }
    return this
  }
  switchValueSign() {
    this._val = this._val === 0 ? 0 : this._val * -1
    return this
  }
  switchFloatPoint() {
    if (!this._isFloat()) {
      this._val += '.'
    } else {}

  }
  reset() {
    this._val = AddableNumber.initState
    return this
  }
  getValue() {
    return parseFloat(this._val)
  }
}
// ------------------------------------
// Queque
// ------------------------------------
export class Queque {
  static initQueque = [0]

  constructor() {
    this.reset()
  }
  _isOperator = (entry) => !!OPERATORS[entry]
  _getOperator = (entry) => OPERATORS[entry]
  _updateQueque = (entry) => this._queque.push(entry)
  _addNumber = (number) => {
    this._numbers.push(number)
    this._updateQueque(number)
  }
  _addOperator = (name) => {
    const lastEntry = _.findLast(this._queque)
    if (this._isOperator(lastEntry) || lastEntry === name) return
    this._operators.push(this._getOperator(name))
    this._updateQueque(name)
  }
  _calculateTriade = (operator, num1, num2) => operator.operate(num1, num2)
  _performOperation = (operator, idx) => {
    const [n1, n2] = this._numbers.splice(idx, 2)
    const triadeResult = this._calculateTriade(operator, n1, n2)
    this._operators.splice(idx, 1)
    this._numbers.splice(idx, 0, triadeResult)
  }
  _calculatePriorityOperations = () => {
    OPERATOR_PRIORITIES.forEach((priority) => {
      this._operators.forEach((operator, index) => {
        if (operator.priority !== priority) return
        this._performOperation(operator, index)
      })
    })
  }
  _calculateBaseOperations = () => {
    while (this._operators.length) {
      this._performOperation(this._operators[0], 0)
    }
  }
  _toReadableQuequeOperators = (entry) => this._isOperator(entry) 
    ? this._getOperator(entry).name
    : entry

  _isReadyToCalculateResult = () => !this._isOperator(_.last(this._queque))
  _calculateResult() {
    this._calculatePriorityOperations()
    this._calculateBaseOperations()
    return this._numbers[0]  
  }
  _getLastNumber = () => _.last(this._numbers)

  add(entry) {
    this._isOperator(entry)
      ? this._addOperator(entry)
      : this._addNumber(entry)
    return this
  }
  updateLastNumber(num) {
    this._numbers.splice(-1, 1, num)
    this._queque.splice(-1, 1, num)
    return this
  }
  reset() {
    this._queque = []
    this._numbers = []
    this._operators = []
    return this
  }
  getResult() {
    return this._isReadyToCalculateResult()
      ? this._calculateResult()
      : this._getLastNumber()
  }
  getQueque() {
    return this._queque
      .map(this._toReadableQuequeOperators)
      .join(' ')
  }
}


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
export const displayResult = () => ({
  type: DISPLAY_RESULT,
  payload: null
})
export const convertToFloat = () => ({
  type: CONVERT_TO_FLOAT,
  payload: null
})


// ------------------------------------
// Action Handlers
// ------------------------------------
const queque = new Queque()
const aNumber = new AddableNumber()
let isNewNumber = true

const ACTION_HANDLERS = {
  [UPDATE_NUMBER]: (state, {payload}) => {
    aNumber.add(payload)
    isNewNumber
      ? queque.add(aNumber.getValue())
      : queque.updateLastNumber(aNumber.getValue())
    isNewNumber = false
    return Object.assign({}, state, {
      queque: queque.getQueque(),
      calculationResult: aNumber.getValue()
    })
  },
  [DO_OPERATION]: (state, {payload}) => {
    aNumber.reset()
    queque.add(payload)
    isNewNumber = true
    return Object.assign({}, state, {
      queque: queque.getQueque()
    })
  },
  [DISPLAY_RESULT]: (state, {payload}) => {
    const calculationResult = queque.getResult()
    queque.reset().add(calculationResult)
    isNewNumber = true
    return Object.assign({}, state, {
      queque: queque.getQueque(),
      calculationResult
    })
  },
  [DO_RESET]: () => {
    aNumber.reset()
    queque.reset()
    isNewNumber = false
    return Object.assign({}, initialState)
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

