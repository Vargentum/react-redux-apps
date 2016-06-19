import moment from 'moment'

// ------------------------------------
// INITIAL STATE
// ------------------------------------
export const initialState = {
  work: {
    active: true,
    duration: moment.duration(25, 'minutes').asMilliseconds(),
    inProgress: false,
    isInit: true,
  },
  rest: {
    active: false,
    duration: moment.duration(5, 'minutes').asMilliseconds(),
    inProgress: false,
    isInit: true
  }
}
const getOppositePomodoroType = (type) => type === 'work' ? 'rest' : 'work'

// ------------------------------------
// Constants
// ------------------------------------
const INIT = 'pomodoro/init'
const START = 'pomodoro/start'
const PAUSE = 'pomodoro/pause'

// ------------------------------------
// Actions
// ------------------------------------
export const doInit = (type) => ({
  type: INIT,
  payload: {type}
})
export const doStart = (type) => ({
  type: START,
  payload: {type}
})
export const doPause = (type) => ({
  type: PAUSE,
  payload: {type}
})

// ------------------------------------
// Action Creators
// ------------------------------------

const ACTION_CREATORS = {
  [INIT]: (state, {payload: {type}}) => ({
    ...state,
    [type]: {
      ...initialState[type],
      active: true
    },
    [getOppositePomodoroType(type)]: {
      ...initialState[getOppositePomodoroType(type)],
      active: false
    }
  }),
  [START]: (state, {payload: {type}}) => ({
    ...state,
    [type]: {
      ...state[type],
      inProgress: true,
      isInit: false
    }
  }),
  [PAUSE]: (state, {payload: {type}}) => ({
    ...state,
    [type]: {
      ...state[type],
      inProgress: false
    }
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
