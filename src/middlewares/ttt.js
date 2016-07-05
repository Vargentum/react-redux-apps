import {PLAYER_TURN, doOpponentTurn} from 'redux/modules/ttt/ttt'
import {createRandomMove} from 'redux/modules/ttt/utils'


export const aiAutoTurn = ({dispatch, getState}) => (next) => (action) => {
  const {ttt: {grid, symbols: {opponent}}} = getState()
  let randomMove
  const result = next(action)
  if (action.type === PLAYER_TURN) {
    randomMove = createRandomMove(grid, opponent).move
    dispatch(doOpponentTurn(randomMove))
  } 
  return result
}