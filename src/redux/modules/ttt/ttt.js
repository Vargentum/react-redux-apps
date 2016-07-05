/*@flow*/

import * as utils from './utils'

// ------------------------------------
// Constants
// ------------------------------------
export const PLAYER_TURN = 'ttt/player_makes_a_turn'
export const OPPONENT_TURN = 'ttt/opponent_makes_a_turn'
const CHOOSE_SYMBOL = 'ttt/player_chooses_a_symbol'

// ------------------------------------
// Actions
// ------------------------------------
 export const doPlayerTurn = (turn: {x:number, y:number}) => {
  return {
    type: PLAYER_TURN,
    payload: {turn}
  }
 }
 export const doOpponentTurn = (turn: {x:number, y:number}) => {
  return {
    type: OPPONENT_TURN,
    payload: {turn}
  }
 }

export const chooseSymbol = (symbol: boolean) => ({
  type: CHOOSE_SYMBOL,
  payload: {symbol}
})
  

// ------------------------------------
// Action Creators
// ------------------------------------
const ACTION_CREATORS = {
  [PLAYER_TURN]: (state, {payload: {turn: {x,y}}}) => ({
    ...state,
    grid: utils.makeATurn(state.grid, x, y, state.symbols.player)
  }),
  [OPPONENT_TURN]: (state, {payload: {turn: {x,y}}}) => ({ //TODO: make DRY
    ...state,
    grid: utils.makeATurn(state.grid, x, y, state.symbols.opponent)
  }),
  [CHOOSE_SYMBOL]: (state, {payload: {symbol}}) => ({
    ...state,
    symbols: {
      player: symbol,
      opponent: !symbol // TODO: make more clearly ?
    }
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  grid: utils.generateEmptyGrid(),
  symbols: {
    player: null,
    opponent: null
  }
}
export default function (state = initialState, action) {
  const handler = ACTION_CREATORS[action.type]
  return handler ? handler(state, action) : state
}
