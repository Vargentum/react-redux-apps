import {PLAYER_TURN, doOpponentTurn} from 'redux/modules/ttt/ttt'
import {findBestMove} from 'redux/modules/ttt/utils'


export const aiAutoTurn = ({dispatch, getState}) => (next) => (action) => {
  const {ttt: {grid, symbols: {opponent}}} = getState()
  let perfectMove
  console.log('test')

  if (action.type === PLAYER_TURN) {
    perfectMove = findBestMove(grid, opponent).move
    store.dispatch(doOpponentTurn(perfectMove))
  } 
  return next(action)
}