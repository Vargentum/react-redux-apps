import {PLAYER_TURN, CHOOSE_SYMBOL, doOpponentTurn} from 'redux/modules/ttt/ttt'
import {SYMBOLS, createRandomMove} from 'redux/modules/ttt/utils'


export const aiAutoTurn = ({dispatch, getState}) => (next) => (action) => {
  const {ttt: {grid, symbols: {opponent, player}}} = getState()
  let randomMove
  const result = next(action)
  const shouldPlayFirst = action.type === CHOOSE_SYMBOL && action.payload.symbol === SYMBOLS.O
  if (action.type === PLAYER_TURN || shouldPlayFirst) {
    randomMove = createRandomMove(grid, opponent).move
    dispatch(doOpponentTurn(randomMove))
  } 
  return result
}
