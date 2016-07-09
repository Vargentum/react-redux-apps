/*@flow*/
import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {doPlayerTurn, doOpponentTurn, chooseSymbol, resetGame, checkGameStatus, GAME_STATUSES, GAME_ENDINGS} from '../redux/modules/ttt/ttt'
import {SYMBOLS, createRandomMove} from '../redux/modules/ttt/utils'
import classNames from 'classnames'
import _ from 'lodash'
import {grid as gridCls} from 'styles/TTT.styl'

const {NOT_STARTED, IN_PROGRESS, FINISHED} = GAME_STATUSES
const {WIN, DRAW} = GAME_ENDINGS

const Grid = ({data, onCellClick}) =>
  //data: Array
  <table className={gridCls}>
    <tbody>
    {data.map((row: Array) =>
      <tr key={_.uniqueId('row-')}>
        {row.map((Cell: ?boolean) =>
          <td key={_.uniqueId('cell-')}
              onClick={() => {
                if (!Cell.isEmpty()) return false
                onCellClick(Cell.coords)
              }}
              style={{
                color: Cell.isWinning ? 'red' : 'dark'
              }}> 
            {_.findKey(SYMBOLS, (val) => val === Cell.value)}
          </td>
        )}
      </tr>
    )}
    </tbody>
  </table>


const ChosePlayerTeam = ({symbols, onChoise, disabled}) =>
  // symbols: Array, onChoise: Function, disabled: boolean
  <div className="f-box f-gap--M">
    {_.map(SYMBOLS, (v, k) =>
      <label key={v} className="f-box f-gap--S">
        <input type="checkbox"
          disabled={disabled}
          checked={symbols.player === v}
          onChange={_.partial(onChoise, v)} />
        {k}
      </label>
    )}
  </div>


type Props = {
  doPlayerTurn: Function,
  chooseSymbol: Function,
  resetGame: Function,
  checkGameStatus: Function,
  grid: Array,
  gameStatus: Number,
  gameEnding: Number,
}

export class TTT extends Component {
  props: Props;

  componentWillMount() {
    // this.props.chooseSymbol(SYMBOLS.X) //Temporary
  }

  componentDidUpdate () {
    this.provideGameUpdate(this.props)
    this.autoAiTurn(this.props)
  }

  shouldComponentUpdate (nextProps) { //Prevent infinite loops
    return !_.isEqual(this.props, nextProps)
  }

  autoAiTurn({grid, gameStatus, doOpponentTurn, nextPlayer, symbols: {opponent}}) {
    const shouldPlay = gameStatus === IN_PROGRESS && nextPlayer === opponent
    if (shouldPlay) {
      const randomMove = createRandomMove(grid, opponent).move
      doOpponentTurn(randomMove)
    } 
  }

  provideGameUpdate({gameStatus, checkGameStatus, resetGame}) {
    if (gameStatus === IN_PROGRESS) {
      checkGameStatus()
    } else if (gameStatus === FINISHED) {
      console.log('game is ended')
    }
  }

  render() {
    const {grid, symbols, gameStatus, 
           doPlayerTurn, chooseSymbol, resetGame} = this.props
    return (
      <div>
        <Grid data={grid} onCellClick={doPlayerTurn}/>
        <button onClick={() => this.provideGameUpdate(this.props)}>Update</button>
        <button onClick={resetGame}>Reset</button>
        <ChosePlayerTeam 
          disabled={gameStatus !== NOT_STARTED} 
          symbols={symbols} 
          onChoise={chooseSymbol} />
      </div>
    )
  }
}

const mapStateToProps = ({ttt}) => {
  return {...ttt}
}
const mapDispatchToProps = {
  doPlayerTurn, chooseSymbol, resetGame, checkGameStatus, doOpponentTurn
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TTT)
