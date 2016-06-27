import {generateEmptyGrid} from './utils'


// ------------------------------------
// Constants
// ------------------------------------
const PLAYER_TURN = 'ttt/player_maked_a_turn'
const CHOOSE_TEAM = 'ttt/player_choose_a_team'

// ------------------------------------
// Actions
// ------------------------------------
 export const doTurn = ({x,y}) => ({
  type: PLAYER_TURN,
  payload: {x,y}
})
export const test = {}

// ------------------------------------
// Action Creators
// ------------------------------------
const ACTION_CREATORS = {
  [PLAYER_TURN]: (state, {payload}) => {}

  // [THUNK]: () => (dispatch, getState) => {}
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  grid: generateEmptyGrid()
}
export default function (state = initialState, action) {
  const handler = ACTION_CREATORS[action.type]
  return handler ? handler(state, action) : state
}
