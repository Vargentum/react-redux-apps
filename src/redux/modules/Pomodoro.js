import Tock from 'tocktimer'


// ------------------------------------
// Timer init
// ------------------------------------

const tockStaticConfig = {
  countdown: true,
  interval: 1000
}
const timer = new Tock(tockStaticConfig)

// ------------------------------------
// Constants
// ------------------------------------

const UPDATE = 'update pomodoro timer value'

const SET_WORK_INTERVAL = 'set pomodoro working interval'
const SET_BREAK_INTERVAL = 'set pomodoro break interval'

const SET_SUCCESS_CALLBACK = 'set success callback for pomodoro timer'

// ------------------------------------
// Actions
// ------------------------------------
export const update = () => ({
  type: UPDATE,
  payload: timer.msToTime(timer.lap())
})
export const applyToTimer = (method, ...args) => (dispatch, getState) => {
  if (!timer || !timer[method] || typeof timer[method] !== 'function') return
  timer[method](args)
  dispatch(update())
}
export const setWorkInterval = (interval) => ({
  type: SET_WORK_INTERVAL,
  payload: interval
})
export const setBreakInterval = (interval) => ({
  type: SET_BREAK_INTERVAL,
  payload: interval
})
export const onTimerComplete = (callback) => (dispatch, getState) => {
  timer.complete = callback
}

// ------------------------------------
// Action Creators
// ------------------------------------

const ACTION_CREATORS = {
  [UPDATE]: (state, {payload: time}) => Object.assign({}, state, {time}),
  [SET_WORK_INTERVAL]: (state, {payload}) => Object.assign({}, state, {
    workInterval: payload
  }),
  [SET_BREAK_INTERVAL]: (state, {payload}) => Object.assign({}, state, {
    breakInterval: payload
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  workInterval: 25,
  breakInterval: 5,
  time: null
}
export default function (state = initialState, action) {
  const handler = ACTION_CREATORS[action.type]
  return handler ? handler(state, action) : state
}
