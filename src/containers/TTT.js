/*@flow*/
import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classNames from 'classnames'

import * as actions from '../redux/modules/ttt/ttt'
import {SYMBOLS, createRandomMove} from '../redux/modules/ttt/utils'
import {grid as gridCls} from 'styles/TTT.styl'

const {INITIAL, IN_PROGRESS, FINISHED} = actions.GAME_STATUSES
const {WIN, DRAW} = actions.GAME_ENDINGS


const Score = ({data}) => {
  const getTotal = (key) => _.sum(_.map(data, key))
  const totalRow = _.keys(_.first(data), (key) =>
    <tr>
      <td key={key}>{getTotal(key)}</td>
    </tr>
  )
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>Win</th>
          <th>Lose</th>
          <th>Draw</th>
        </tr>
        {_.map(data, ({win,lose,draw},player) =>
          <tr key={player}>
            <td>{player}</td>
            <td>{win}</td>
            <td>{lose}</td>
            <td>{draw}</td>
          </tr>
        )}
        {totalRow}
      </tbody>
    </table>
  )
}

const Grid = ({data, onCellClick, gameStatus}) =>
  //data: Array, onCellClick: Function, gameStatus: Number
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
  doOpponentTurn: Function,
  chooseSymbol: Function,
  resetGame: Function,
  updateGameStatus: Function,
  grid: Array,
  gameStatus: Number,
  gameEnding: Number,
}

export class TTT extends Component {
  props: Props;

  componentDidUpdate () {
    this.onPlayerTurn(this.props)
  }

  shouldComponentUpdate (nextProps) { //Prevent infinite loops
    const isEqualProps = _.isEqual(this.props, nextProps)
    const scoreUpdateLoop = this.props.scoreUpdated && this.props.scoreUpdated === nextProps.scoreUpdated
    const infiniteUpdate = isEqualProps || scoreUpdateLoop

    return !infiniteUpdate
  }

  onPlayerTurn({prevPlayer, nextPlayer, symbols: {player}}) {
    const isPlayerTurned = prevPlayer === player && prevPlayer !== nextPlayer
    if (!isPlayerTurned) return
    new Promise((resolve, reject) => {
      this.provideGameUpdate(this.props)
      resolve()
    }).then(() => {
      this.autoAiTurn(this.props)
    });
  }

  autoAiTurn({grid, gameStatus, doOpponentTurn, nextPlayer, symbols: {opponent}}) {
    const shouldPlay = gameStatus === IN_PROGRESS && nextPlayer === opponent
    if (shouldPlay) {
      const randomMove = createRandomMove(grid, opponent).move
      doOpponentTurn(randomMove)
    }
  }

  provideGameUpdate({gameStatus, updateGameStatus}) {
    switch (gameStatus) {
      case INITIAL: return
      case IN_PROGRESS: updateGameStatus(); break
      case FINISHED: this.finishGame(this.props); break;
    }
  }

  finishGame({updateGameScore, resetGame}) {
    updateGameScore()
    _.delay(resetGame, 3000)
  }

  render() {
    const {grid, symbols, gameStatus, scoreTable,
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
        <Score data={scoreTable} />
      </div>
    )
  }
}

const mapStateToProps = ({ttt}) => {
  return {...ttt}
}
const mapDispatchToProps = {...actions}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TTT)
