import moment from 'moment'

// ------------------------------------
// INITIAL STATE & helpers
// ------------------------------------
const getOppositePomodoroType = (type) => type === 'work' ? 'rest' : 'work'

export const initialState = {
  work: {
    active: true,
    duration: moment.duration(25, 'm').asMilliseconds(),
    inProgress: false,
    isInit: true
  },
  rest: {
    active: false,
    duration: moment.duration(5, 'm').asMilliseconds(),
    inProgress: true,
    isInit: true
  }
}
// ------------------------------------
// Constants
// ------------------------------------
const INIT = 'pomodoro/init'
const START = 'pomodoro/start'
const PAUSE = 'pomodoro/pause'
const UPD_DURATION = 'pomodoro/set_duration'

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
export const updateDuration = (duration, type) => ({
  type: UPD_DURATION,
  payload: {
    duration,
    type
  }
})

// ------------------------------------
// Action Creators
// ------------------------------------

const ACTION_CREATORS = {
  [INIT]: (state, {payload: {type}}) => ({
    ...state,
    [type]: {
      ...initialState[type],
      duration: state[type].duration,
      active: true
    },
    [getOppositePomodoroType(type)]: {
      ...initialState[getOppositePomodoroType(type)],
      duration: state[getOppositePomodoroType(type)].duration,
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
  }),
  [UPD_DURATION]: (state, {payload: {duration, type}}) => ({
    ...state,
    [type]: {
      ...state[type],
      duration
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
