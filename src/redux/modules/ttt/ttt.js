/*@flow*/

import * as utils from './utils'

// ------------------------------------
// Constants
// ------------------------------------
export const PLAYER_TURN = 'ttt/player_makes_a_turn'
export const OPPONENT_TURN = 'ttt/opponent_makes_a_turn'
export const CHOOSE_SYMBOL = 'ttt/player_chooses_a_symbol'
export const UPDATE_GAME_STATUS = 'ttt/check_game_status'
const RESET_GAME = 'ttt/reset_game'
const UPDATE_SCORE = 'ttt/calculate_score'

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
export const updateGameStatus = () => ({
  type: UPDATE_GAME_STATUS
})
export const updateGameScore = () => ({
  type: UPDATE_SCORE
})



// ------------------------------------
// Action Creators
// ------------------------------------
const ACTION_CREATORS = {
  [PLAYER_TURN]: (state, {payload: {turn: {x,y}}}) => ({
    ...state,
    grid: utils.makeATurn(state.grid, x, y, state.symbols.player),
    nextPlayer: state.symbols.opponent,
    prevPlayer: state.symbols.player,
    gameStatus: GAME_STATUSES.IN_PROGRESS
  }),
  [OPPONENT_TURN]: (state, {payload: {turn: {x,y}}}) => ({ //TODO: make DRY
    ...state,
    grid: utils.makeATurn(state.grid, x, y, state.symbols.opponent),
    nextPlayer: state.symbols.player,
    prevPlayer: state.symbols.opponent,
    gameStatus: GAME_STATUSES.IN_PROGRESS
  }),
  [CHOOSE_SYMBOL]: (state, {payload: {symbol}}) => ({
    ...state,
    symbols: {
      player: symbol,
      opponent: !symbol, // TODO: make more clearly ?
    },
    nextPlayer: utils.SYMBOLS.X
  }),
  [UPDATE_GAME_STATUS]: (state) => {
    let {grid, nextPlayer, prevPlayer, gameEnding, gameStatus} = _.cloneDeep(state)
    const moves = utils.generatePossibleMoves(grid, nextPlayer)
    const winRow = utils.findWinRow(grid, prevPlayer)

    if (winRow) {
      grid = utils.highlightWinRow(grid, winRow)
      gameEnding = GAME_ENDINGS.WIN
      gameStatus = GAME_STATUSES.FINISHED
    }
    else if (!moves.length) {
      gameEnding = GAME_STATUSES.DRAW
      gameStatus = GAME_STATUSES.FINISHED
    }
    return { ...state, grid, gameEnding, gameStatus }
  },
  [RESET_GAME]: (state) => ({
    ...initialState,
    symbols: state.symbols
  }),
  [UPDATE_SCORE]: (state) => {
    const {gameEnding, nextPlayer, prevPlayer, scoreTable, symbols: {player, opponent}} = _.cloneDeep(state)
    const isPlayer = {
      win: () => gameEnding === GAME_ENDINGS.WIN && prevPlayer === player,
      lose: () => gameEnding === GAME_ENDINGS.WIN && prevPlayer === opponent,
      draw: () => gameEnding === GAME_ENDINGS.DRAW
    }
    const scoreUpdater = {
      player: (score, pred) => pred() ? score + 1 : score,
      opponent: (score, pred) => !pred() ? score + 1 : score
    }
    const tableUpdater = (entry, participant) => 
      _.mapValues(entry, (score, type) => 
        scoreUpdater[participant](score, isPlayer[type])
      
    )

    return {
      ...state,
      scoreUpdated: true,
      scoreTable: _.mapValues(scoreTable, tableUpdater)
    }
  }
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
  },
  scoreTable: new utils.ScoreTable(),
  scoreUpdated: false
}
export default function (state = initialState, action) {
  const handler = ACTION_CREATORS[action.type]
  return handler ? handler(state, action) : state
}
