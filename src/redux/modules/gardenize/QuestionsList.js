import reqwest from 'reqwest'
import {getResource, asyncRequest, createQuestionEntry, postEntryAsFirst} from './common'


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


export const postNewQuestion = (formData) => ({
  type: "POST_NEW_QUESTION",
  payload: formData
})



// Action Handlers
const ACTION_HANDLERS = {
  QUESTIONS_LOAD_SUCCESS: (state, {type, payload}) =>
    Object.assign({}, state, {
      questions: state.cachedQuestions || payload, 
      cachedQuestions: state.cachedQuestions || payload,
      loaded: true
    })
  ,
  FILTER_QUESTIONS: (state, {type, payload}) => {
    return Object.assign({}, state, {questions: payload})
  },
  POST_NEW_QUESTION: (state, {type, payload}) => {
    const questionEntry = createQuestionEntry(state.questions, payload)
    return Object.assign({}, state, {
      questions: postEntryAsFirst(state.questions, questionEntry),
      cachedQuestions: postEntryAsFirst(state.cachedQuestions, questionEntry)
    })
  }
}

// Reducer
const initialState = {
  cachedQuestions: null,
  questions: [],
  answer: {},
  loaded: false
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
