import reqwest from 'reqwest'
import {getResource, asyncRequest} from './common'

// Action Creators
export const loadQuestionsList = () => asyncRequest({
  resource: 'questions',
  event: 'QUESTIONS'
})

// Action Handlers
const ACTION_HANDLERS = {
  QUESTIONS_LOAD_SUCCESS: (state, {type, payload}) =>
    Object.assign({}, state, {questions: payload, loaded: true})
}

// Reducer
const initialState = {
  questions: [],
  answer: {},
  loaded: false
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
