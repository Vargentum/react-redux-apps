import moment from 'moment'

// ------------------------------------
// INITIAL STATE
// ------------------------------------
export const initialState = {
  work: {
    active: true,
    duration: moment.duration(25, 'minutes').asMilliseconds(),
    inProgress: false
  },
  rest: {
    active: false,
    duration: moment.duration(5, 'minutes').asMilliseconds(),
    inProgress: false
  }
}

// ------------------------------------
// Constants
// ------------------------------------
const START = 'pomodoro/start'
const PAUSE = 'pomodoro/pause'
const RESET = 'pomodoro/reset'

// ------------------------------------
// Actions
// ------------------------------------
 export const doStart = (type) => ({
  type: START,
  payload: {type}
})
export const doPause = (type) => ({
  type: PAUSE,
  payload: {type}
})
 export const doReset = (type) => ({
  type: RESET,
  payload: {type}
})

// ------------------------------------
// Action Creators
// ------------------------------------
const ACTION_CREATORS = {
  [START]: (state, {payload: {type}}) => ({
    ...state,
    [type]: {
      ...state[type],
      inProgress: true
    }
  }),
  [PAUSE]: (state, {payload: {type}}) => ({
    ...state,
    [type]: {
      ...state[type],
      inProgress: false
    }
  }),
  [RESET]: (state, {payload: {type}}) => ({
    ...state,
    [type]: initialState[type]
  })
  // [THUNK]: () => (dispatch, getState) => {}
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function (state = initialState, action) {
  const handler = ACTION_CREATORS[action.type]
  return handler ? handler(state, action) : state
}
