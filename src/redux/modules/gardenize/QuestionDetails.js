import reqwest from 'reqwest'
import {asyncRequest} from './common'


export const getQuestionData = (id) =>
  asyncRequest(
    'questions',
    (response) => response.filter(x => x.id === id)[0]
  )

export const getAnswersFromIdList = (idList) =>
  asyncRequest(
    'answers', 
    (response) => response.filter(x => idList.indexOf(x.id) !== -1)
  )

// Action Handlers
const ACTION_HANDLERS = {
  QUESTIONS_LOAD_SUCCESS: (state, {type, payload}) =>
    Object.assign({}, state, {questionData: payload, questionLoaded: true}),

  ANSWERS_LOAD_SUCCESS: (state, {type, payload}) =>
    Object.assign({}, state, {answersList: payload, answersLoaded: true})
}

// Reducer
const initialState = {
  answersLoaded: false,
  questionLoaded: false,
  answersList: [],
  questionData: {}
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
