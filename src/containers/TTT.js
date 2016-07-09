/*@flow*/
import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {doPlayerTurn, doOpponentTurn, chooseSymbol, resetGame, checkGameStatus, GAME_STATUSES, GAME_ENDINGS} from '../redux/modules/ttt/ttt'
import {SYMBOLS, createRandomMove} from '../redux/modules/ttt/utils'
import classNames from 'classnames'
import _ from 'lodash'
import {grid as gridCls} from 'styles/TTT.styl'

const {INITIAL, IN_PROGRESS, FINISHED} = GAME_STATUSES
const {WIN, DRAW} = GAME_ENDINGS

const Grid = ({data, onCellClick, gameStatus}) =>
  //data: Array
  <table className={gridCls}>
    <tbody>
    {data.map((row: Array) =>
      <tr key={_.uniqueId('row-')}>
        {row.map((Cell: ?boolean) =>
          <td key={_.uniqueId('cell-')}
              onClick={() => {
                if (!Cell.isEmpty() || gameStatus === FINISHED) return false
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


const ChosePlayerTeam = ({symbols, onInputChange, disabled}) =>
  // symbols: Array, onInputClick: Function, disabled: boolean
  <div className="f-box f-gap--M">
    {_.map(SYMBOLS, (v, k) =>
      <label key={v} className="f-box f-gap--S">
        <input type="checkbox"
          disabled={disabled}
          checked={symbols.player === v}
          onChange={_.partial(onInputChange, v)} />
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
    new Promise((resolve, reject) => {
      this.provideGameUpdate(this.props)
      resolve()
    }).then(() => {
      this.autoAiTurn(this.props)
    });
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

  provideGameUpdate({gameStatus, checkGameStatus}) {
    if (gameStatus === IN_PROGRESS) {
      checkGameStatus()
    } else if (gameStatus === FINISHED) {
      this.finishGame(this.props)
    }
  }

  finishGame({updateScore, resetGame}) {
    // updateScore()
    _.delay(resetGame, 3000)
  }

  render() {
    const {grid, symbols, gameStatus, 
           doPlayerTurn, chooseSymbol, resetGame} = this.props
    return (
      <div>
        <Grid 
          data={grid} 
          onCellClick={doPlayerTurn}
          gameStatus={gameStatus} />
        <button onClick={resetGame}>Reset</button>
        <ChosePlayerTeam 
          disabled={gameStatus === IN_PROGRESS} 
          symbols={symbols} 
          onInputChange={chooseSymbol} />
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
