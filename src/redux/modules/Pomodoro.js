import Tock from 'tock'


// ------------------------------------
// Constants
// ------------------------------------
const tockStaticConfig = {
  countdown: true,
  interval: 100
}

const START = 'start pomodoro timer'
const PAUSE = 'pause pomodoro timer'
const RESET = 'reset pomodoro timer'
const UPDATE = 'update pomodoro timer value'

const SET_WORK_INTERVAL = 'set pomodoro working interval'
const SET_BREAK_INTERVAL = 'set pomodoro break interval'

const SET_SUCCESS_CALLBACK = 'set success callback for pomodoro timer'

// ------------------------------------
// Actions
// ------------------------------------
export const start = (countdown) => ({
  type: START,
  payload: countdown
})
export const pause = () => ({
  type: PAUSE,
  payload: null
})
export const reset = () => ({
  type: RESET,
  payload: null
})
export const update = () => ({
  type: UPDATE,
  payload: null
})

export const setWorkInterval = (interval) => ({
  type: SET_WORK_INTERVAL,
  payload: interval
})
export const setBreakInterval = (interval) => ({
  type: SET_BREAK_INTERVAL,
  payload: interval
})

export const onSuccess = (callback) => ({
  type: SET_SUCCESS_CALLBACK,
  payload: callback
})

// ------------------------------------
// Action Creators
// ------------------------------------
const ACTION_CREATORS = {
  [SET_SUCCESS_CALLBACK]: (state, {payload: success}) => Object.assign({}, state, {
    tock: new Tock(Object.assign({}, tockStaticConfig, {success}))
  }),
  [START]: (state, {payload}) => Object.assign({}, state, {
    timer: state.tock.start(payload)
  }),
  [PAUSE]: (state) => Object.assign({}, state, {
    timer: state.tock.pause()
  }),
  [RESET]: (state) => Object.assign({}, state, {
    timer: state.tock.reset(Tock.timeToMS(state.workInterval))
  }),
  [UPDATE]: (state) => Object.assign({}, state, {
    timer: state.tock.lap()
  }),
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
  workInterval: '25:00',
  breakInterval: '5:00',
  timer: null,
  tock: new Tock(tockStaticConfig)
}
export default function (state = initialState, action) {
  const handler = ACTION_CREATORS[action.type]
  return handler ? handler(state, action) : state
}
