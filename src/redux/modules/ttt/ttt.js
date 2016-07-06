/*@flow*/

import * as utils from './utils'

// ------------------------------------
// Constants
// ------------------------------------
export const PLAYER_TURN = 'ttt/player_makes_a_turn'
export const OPPONENT_TURN = 'ttt/opponent_makes_a_turn'
const CHOOSE_SYMBOL = 'ttt/player_chooses_a_symbol'
const RESET_GAME = 'ttt/reset_game'

export const GAME_STATUSES = {
  NOT_STARTED: 1,
  IN_PROGRESS: 2,
  FINISHED: 3
}

// ------------------------------------
// Actions
// ------------------------------------
 export const doPlayerTurn = (turn: {x:number, y:number}) => ({
  type: PLAYER_TURN,
  payload: {turn}
})
 export const doOpponentTurn = (turn: {x:number, y:number}) => ({
  type: OPPONENT_TURN,
  payload: {turn}
})
export const chooseSymbol = (symbol: boolean) => ({
  type: CHOOSE_SYMBOL,
  payload: {symbol}
})
export const resetGame = () => ({
  type: RESET_GAME,
  payload: {}
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
    },
    gameStatus: GAME_STATUSES.IN_PROGRESS
  }),
  [RESET_GAME]: () => initialState
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  grid: utils.generateEmptyGrid(),
  gameStatus: GAME_STATUSES.NOT_STARTED,
  symbols: {
    player: null,
    opponent: null
  }
}
export default function (state = initialState, action) {
  const handler = ACTION_CREATORS[action.type]
  return handler ? handler(state, action) : state
}
