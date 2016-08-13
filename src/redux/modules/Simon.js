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

export const GAME_SECTORS = {
  topRight: 0,
  bottomRight: 1,
  bottomLeft:2,
  topLeft: 3
}
let GS_check: Array<string> = values(GAME_SECTORS)

export const GAME_MAX_LEVEL = 20

/* -----------------------------
  Redux constants
----------------------------- */
const GO_TO_NEXT_LEVEL = 'simon/GO_TO_NEXT_LEVEL'
const FINISH_GAME = 'simon/FINISH_GAME'
const RESET_GAME = 'simon/RESET_GAME'
const RESET_LEVEL = 'simon/RESET_LEVEL'
const TOGGLE_STRICT_MODE = 'simon/TOGGLE_STRICT_MODE'
const TOGGLE_HARD_MODE = 'simon/TOGGLE_HARD_MODE'
const CHANGE_GAME_STATUS = 'simon/CHANGE_GAME_STATUS'

// ------------------------------------
// Actions
// ------------------------------------
export const goToNextLevel = (): Action => ({
  type: GO_TO_NEXT_LEVEL
})
export const finishGame = (): Action => ({
  type: FINISH_GAME
})
export const resetGame = (): Action => ({
  type: RESET_GAME
})
export const resetLevel = (): Action => ({
  type: RESET_LEVEL
})

export const toggleStrictMode = (): Action => ({
  type: TOGGLE_STRICT_MODE
})
export const toggleHardMode = (): Action => ({
  type: TOGGLE_HARD_MODE
})
export const changeGameStatus = (status: number): Action => ({
  type: CHANGE_GAME_STATUS,
  payload: {status}
})

// ------------------------------------
// Utils
// ------------------------------------
const progressFlash = (flashes: Array<number> = []): Array<number> => ([
  ...flashes, _.random(0, 3)
])
const progressUniqueFlash = (flashes: Array<number> = []): Array<number> => {
  const last = _.last(flashes)
  let rnd
  do rnd = _.random(0, 3)
  while (rnd === last)
  return [...flashes, rnd] 
}

// ------------------------------------
// Reducer
// ------------------------------------
type initialStateType = {
  level: number,
  status: number,
  isStrict: boolean,
  isHard: boolean,
  flashes: ?Array<Object>
}

export const initialState: initialStateType = {
  level: 0,
  status: GAME_STATUSES.notStarted,
  isStrict: false,
  isHard: false,
  flashes: []
}
export default createReducer(initialState, {
  [GO_TO_NEXT_LEVEL]: (state) => ({
    ...state,
    level: state.level + 1,
    flashes: [
      ...state.flashes, 
      state.isHard 
        ? progressUniqueFlash(_.last(state.flashes))
        : progressFlash(_.last(state.flashes)) 
    ]
  }),
  [TOGGLE_STRICT_MODE]: (state) => ({
    ...state,
    isStrict: !state.isStrict
  }),
  [TOGGLE_HARD_MODE]: (state) => ({
    ...state,
    isHard: !state.isHard
  }),
  [CHANGE_GAME_STATUS]: (state, {status}) => ({
    ...state,
    status
  }),
  [RESET_GAME]: (state) => ({...initialState})
  // [THUNK]: () => (dispatch, getState) => {}
})
