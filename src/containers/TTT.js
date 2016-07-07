/*@flow*/
import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {doPlayerTurn, chooseSymbol, resetGame, GAME_STATUSES} from '../redux/modules/ttt/ttt'
import {SYMBOLS, createRandomMove} from '../redux/modules/ttt/utils'
import classNames from 'classnames'
import _ from 'lodash'
import {grid as gridCls} from 'styles/TTT.styl'

const {NOT_STARTED, IN_PROGRESS, FINISHED} = GAME_STATUSES

const Grid = ({data}) =>
  //data: Array
  <table className={gridCls}>
    <tbody>
    {data.map((row: Array) =>
      <tr key={_.uniqueId('row-')}>
        {row.map((cell: ?boolean) =>
          <td key={_.uniqueId('cell-')}>
            {(() => {
              switch (cell) {
                case true: return 'X'
                case false: return 'O'
              }
            })()}
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
  grid: Array,
  gameStatus: Number
}

export class TTT extends Component {
  props: Props;

  componentWillMount() {
    // this.props.chooseSymbol(SYMBOLS.X) //Temporary
  }

  doRandomTurn = ({grid, symbols: {player}, doPlayerTurn}) => () => {
    const randomMove = createRandomMove(grid, player).move
    doPlayerTurn(randomMove)
  }

  render() {
    const {grid, symbols, gameStatus, 
           doPlayerTurn, chooseSymbol, resetGame} = this.props
    return (
      <div>
        <Grid data={grid}/>
        <button onClick={this.doRandomTurn(this.props)}>Turn</button>
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
  const {grid, symbols, gameStatus} = ttt
  return {grid, symbols, gameStatus}
}
const mapDispatchToProps = {
  doPlayerTurn, chooseSymbol, resetGame
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TTT)
