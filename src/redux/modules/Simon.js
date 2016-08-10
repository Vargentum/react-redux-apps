/* @flow */
import createReducer from 'create-reducer-map'
import _ from 'lodash'

const values = (o: Object) => Object.keys(o).map((k) => o[k])

// ------------------------------------
// Flow checked contants
// ------------------------------------
export const GAME_STATUSES = {
  notStarted: 0,
  generateHighlighting: 1,
  waitingForUserInput: 2,
  error: 3,
  finised: 4
}
let GA_check: string[] = values(GAME_STATUSES)

export const GAME_MODE = {
  normal: 0,
  strict: 1
}
let GM_check: Array<string> = values(GAME_MODE)

export const GAME_SECTORS = {
  topRight: 0,
  bottomRight: 1,
  bottomLeft:2,
  topLeft: 3
}
let GS_check: Array<string> = values(GAME_SECTORS)


/* -----------------------------
  Redux constants
----------------------------- */
const GO_TO_NEXT_LEVEL = 'simon/GO_TO_NEXT_LEVEL'
const CHANGE_GAME_MODE = 'simon/CHANGE_GAME_MODE'
const CHANGE_GAME_STATUS = 'simon/CHANGE_GAME_STATUS'
const CHECK_USER_INPUT = 'simon/CHECK_USER_INPUT'

// ------------------------------------
// Actions
// ------------------------------------
export const goToNextLevel = (): Action => ({
  type: GO_TO_NEXT_LEVEL
})

export const changeGameMode = (mode: number): Action => ({
  type: CHANGE_GAME_MODE,
  payload: {mode}
})

export const changeGameStatus = (status: number): Action => ({
  type: CHANGE_GAME_STATUS,
  payload: {status}
})

export const checkUserInput = (sector: number, index: number): Action => ({
  type: CHECK_USER_INPUT,
  payload: {sector, index}
})

// ------------------------------------
// Utils
// ------------------------------------
const progressFlash = (flashes: Array<number> = []): Array<number> => ([
  ...flashes, _.random(0, 3)
])

// ------------------------------------
// Reducer
// ------------------------------------
type initialStateType = {
  level: number,
  status: number,
  mode: number,
  flashes: ?Array<Object>
}

export const initialState: initialStateType = {
  level: 0,
  status: GAME_STATUSES.notStarted,
  mode: GAME_MODE.normal,
  flashes: []
}
export default createReducer(initialState, {
  [GO_TO_NEXT_LEVEL]: (state) => ({
    ...state,
    level: state.level + 1,
    flashes: [...state.flashes, progressFlash(_.last(state.flashes))]
  }),
  [CHANGE_GAME_MODE]: (state, {payload: {mode}}) => ({
    ...state,
    mode
  }),
  [CHANGE_GAME_STATUS]: (state, {payload: {status}}) => ({
    ...state,
    status
  }),
  [CHECK_USER_INPUT]: (state, {payload: {sector, index}}) => ({
    ...state
  })
  // [THUNK]: () => (dispatch, getState) => {}
})
