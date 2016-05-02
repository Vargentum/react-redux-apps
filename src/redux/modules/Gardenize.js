import reqwest from 'reqwest'

// Constants
export const DATA_URL = {
  questions: './gardenize/questions.json',
  answers: './gardenize/answers.json'
}


const getResource = (type, onSuccess, onFail) => {
  if (!DATA_URL[type]) throw new Error(`No such resource: ${type}`)
  reqwest({
    url: DATA_URL[type],
    method: 'get',
    type: 'json',
    success: onSuccess,
    error: onFail
  })
}


// Action Creators
export const loadQuestionsList = () =>
  (dispatch, getState) =>
    getResource(
      'questions',
      (response) => dispatch({
        type: "QUESTIONS_LOAD_SUCCESS",
        payload: response
      }),
      (error) => dispatch({
        type: "QUESTIONS_LOAD_ERROR",
        payload: error
      }))



const retreiveQuestionData = (id) => {

}

const loadAnswers = (idList) =>
  (dispatch, getState) =>
    getResource(
      'answers',
      (response) => dispatch({
        type: "ANSWERS_LOAD_SUCCESS",
        payload: response.filter(x => idList.indexOf(x) !== -1)
      }),
      (error) => dispatch({
        type: "ANSWERS_LOAD_ERROR",
        payload: error
      }))


export const loadQuestionDetails = (id) => {

}


// Action Handlers
const ACTION_HANDLERS = {
  QUESTIONS_LOAD_SUCCESS: (state, {type, payload}) =>
    Object.assign({}, state, {questions: payload, questionsLoaded: true})
}

// Reducer
const initialState = {
  questions: [],
  answer: {},
  questionsLoaded: false
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
