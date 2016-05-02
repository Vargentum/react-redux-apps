import reqwest from 'reqwest'
import {getResource, asyncRequest} from './common'


export const filters = {
  all: {
    label: 'All',
    filter: (item) => item
  },
  unanswered: {
    label: 'Unanswered',
    filter: (item) => !item.resolvedBy
  },
  answered: {
    label: 'With Answers',
    filter: (item) => item.resolvedBy
  }
}


// Action Creators
export const loadQuestionsList = () => asyncRequest({
  resource: 'questions',
  event: 'QUESTIONS'
})

export const filterQuestionsBy = (filterType) => 
  (dispatch, getState) => dispatch({
    type: "FILTER_QUESTIONS",
    payload: (() => {
      if (filters[filterType]) {
        return getState().gardenizeQuestionsList.cachedQuestions.filter(filters[filterType].filter)
      }
      else {
        return getState()
      }
    })()
  })


// Action Handlers
const ACTION_HANDLERS = {
  QUESTIONS_LOAD_SUCCESS: (state, {type, payload}) =>
    Object.assign({}, state, {
      questions: payload, 
      loaded: true,
      cachedQuestions: payload
    })
  ,
  FILTER_QUESTIONS: (state, {type, payload}) => {
    return Object.assign({}, state, {questions: payload})
  }
}

// Reducer
const initialState = {
  cachedQuestions: [],
  questions: [],
  answer: {},
  loaded: false
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
