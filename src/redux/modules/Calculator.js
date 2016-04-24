import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
const UPDATE_NUMBER = 'update active number'
const DO_OPERATION = 'perform calculation operation'
const DO_RESET = 'calculator reset'
const CONVERT_TO_FLOAT = 'convert active number to float'

export const OPERATORS = {
  add: {
    operate: (i1,i2) => i1 + i2,
    name: '+',
    priority: 1
  },
  substract: {
    operate: (i1,i2) => i1 - i2,
    name: '-',
    priority: 1
  },
  multiple: {
    operate: (i1,i2) => i1 * i2,
    name: '*',
    priority: 2
  },
  divide: {
    operate: (i1,i2) => i1 / i2,
    name: '/',
    priority: 2
  }
}

// ------------------------------------
// AddableNumber
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

  constructor(queque = Queque.initQueque.slice()) {
    this._q = queque
  }
  _isOperator = (entry) => !!OPERATORS[entry]
  _getOperator = (o) => OPERATORS[o]
  _getTriade = (n,i,a) => [a[i-1] || 0, n, a[i+1] || 0]
  _breakToTriades = (p,n,i,a) => {
    const triade = this._getTriade(n,i,a)
    return this._isOperator(n) ? p.concat([triade]) : p
  }
  _collapseRepeated = (n,i,a) => n !== a[i+1]
  _flattenTriades = (ary) => {
    return _(ary).flatten().filter(this._collapseRepeated).value()
  }
  _sortByPriority = (ary) => {
    const sortedTriades = ary
      .reduce(this._breakToTriades, [])
      // .sort(([x1,o1,x2], [y1,o2,y2]) => {
      //   return this._getOperator(o2).priority - this._getOperator(o1).priority
      // })
    console.log(sortedTriades)
    return this._flattenTriades(sortedTriades)
  }
  _calculateTriade = ([n1, o, n2]) => {
    return this._getOperator(o).operate(n1, n2)
  }

  add(smth) {
    this._q.push(smth)
    return this
  }
  update(num) {
    let last = _.last(this._q) 
    last = num
    return this
  }
  reset() {
    this._q = Queque.initQueque.slice()
    return this
  }
  getResult() {
    const sortedQ = this._sortByPriority(this._q)
    return sortedQ.reduce((result, item, idx, ary) => {
      return this._isOperator(item)
        ? this._calculateTriade([result, item, ary[idx+1] || 0])
        : result
    })
  }
  toString() {
    return this._q
      .map((x) => this._isOperator(x) ? x.name : x)
      .join(' ')
  }
}


// ------------------------------------
// History
// ------------------------------------
// class Calculator {
//   static initState = [0]

//   constructor(initQueque = Calculator.initState) {
//     this._queque = initQueque
//   }
  
//   _getOperations = () => this._queque.filter(this._isOperator)
//   _getNumbers = () =>    this._queque.filter(this._isNumber)
//   _updateEntry = (oVal, nVal) => {
//     console.log(oVal, nVal)
//     switch (oVal) {
//       case 0: return nVal
//       default: return parseInt('' + oVal + nVal)
//     }
//   }
//   addCharacter(char) {
//     const lastEntry = _.last(this._queque)
//     this._isOperator(char) || this._isOperator(lastEntry)
//       ? this._queque.push(char)
//       : this._queque.splice(-1, 1, this._updateEntry(lastEntry, char))
//   }
//   isReadyToCalculate() {
//     return this._getOperations().length > 0
//            && this._getNumbers().length > 1
//   }
//   isValidExpression(o1, op, o2) {
//     return this._isOperator(op) 
//            && typeof o1 === 'number' 
//            && typeof o2 === 'number'
//   }
//   calculateExpression(o1, op, o2) {
//     return OPERATORS[op].operate(o1, o2)
//   }
//   calculateResult() {
//     return this._queque.reduce((result, entry, idx, history) => {
//       const [o1, o2] = [history[idx - 1], history[idx + 1]]
//       return this.isValidExpression(o1, entry, o2)
//         ? result = this.calculateExpression(o1, entry, o2)
//         : result
//     }, 0)
//   }
//   getLastCalculatedValue() {
//     return _.findLast(this._queque, this._isNumber)
//   }
//   getQueque() {
//     return this._queque.join(' ')
//   }
//   reset() {
//     this._queque = Calculator.initState
//   }
// }

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
const queque = new Queque()
const aNumber = new AddableNumber()

const ACTION_HANDLERS = {
  [UPDATE_NUMBER]: (state, {payload}) => {
    aNumber.add(payload)
    queque.update(aNumber.getValue())
    return Object.assign({}, state, {
      queque: queque.toString(),
      calculationResult: queque.getResult()
    })
  },
  [DO_OPERATION]: (state, {payload}) => {
    aNumber.reset()
    queque.add(payload)
    return Object.assign({}, state, {
      queque: queque.toString(),
      calculationResult: queque.getResult()
    })
  },
  [DO_RESET]: () => {
    aNumber.reset()
    queque.reset()
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

