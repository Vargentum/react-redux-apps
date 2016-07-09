/*@flow*/

import * as utils from './utils'

// ------------------------------------
// Constants
// ------------------------------------
export const PLAYER_TURN = 'ttt/player_makes_a_turn'
export const OPPONENT_TURN = 'ttt/opponent_makes_a_turn'
export const CHOOSE_SYMBOL = 'ttt/player_chooses_a_symbol'
export const CHECK_GAME_STATUS = 'ttt/check_game_status'
const RESET_GAME = 'ttt/reset_game'

export const GAME_STATUSES = {
  INITIAL: 1,
  IN_PROGRESS: 2,
  FINISHED: 3
}
export const GAME_ENDINGS = {
  WIN: 1,
  DRAW: 2
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
export const checkGameStatus = () => ({
  type: CHECK_GAME_STATUS
})



// ------------------------------------
// Action Creators
// ------------------------------------
const ACTION_CREATORS = {
  [PLAYER_TURN]: (state, {payload: {turn: {x,y}}}) => ({
    ...state,
    grid: utils.makeATurn(state.grid, x, y, state.symbols.player),
    nextPlayer: state.symbols.opponent,
    gameStatus: GAME_STATUSES.IN_PROGRESS
  }),
  [OPPONENT_TURN]: (state, {payload: {turn: {x,y}}}) => ({ //TODO: make DRY
    ...state,
    grid: utils.makeATurn(state.grid, x, y, state.symbols.opponent),
    nextPlayer: state.symbols.player,
    gameStatus: GAME_STATUSES.IN_PROGRESS
  }),
  [CHOOSE_SYMBOL]: (state, {payload: {symbol}}) => ({
    ...state,
    symbols: {
      player: symbol,
      opponent: !symbol // TODO: make more clearly ?
    },
    nextPlayer: utils.SYMBOLS.X
  }),
  [CHECK_GAME_STATUS]: (state) => {
    const newState = _.cloneDeep(state)
    const moves = utils.generatePossibleMoves(newState.grid, newState.nextPlayer)
    const prevPlayer = !newState.nextPlayer //TODO: create mechanism of getting prevPlayer
    const winRow = utils.findWinRow(newState.grid, prevPlayer) 

    if (winRow) {
      newState.grid = utils.highlightWinRow(newState.grid, winRow)
      newState.gameEnding = GAME_ENDINGS.WIN
      newState.gameStatus = GAME_STATUSES.FINISHED
    }
    else if (!moves.length) {
      newState.gameEnding = GAME_STATUSES.DRAW
      newState.gameStatus = GAME_STATUSES.FINISHED
    }
    return newState
  },
  [RESET_GAME]: (state) => ({
    ...initialState,
    symbols: state.symbols
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  grid: utils.generateEmptyGrid(),
  gameStatus: GAME_STATUSES.INITIAL,
  gameEnding: null,
  nextPlayer: null,
  symbols: {
    player: null,
    opponent: null
  }
}
export default function (state = initialState, action) {
  const handler = ACTION_CREATORS[action.type]
  return handler ? handler(state, action) : state
}
