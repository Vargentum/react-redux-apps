/*@flow*/
import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {doPlayerTurn, chooseSymbol} from '../redux/modules/ttt/ttt'
import {toReadableGrid, SYMBOLS, createRandomMove} from '../redux/modules/ttt/utils'
import classNames from 'classnames'
import _ from 'lodash'
import {grid as gridCls} from 'styles/TTT.styl'

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



type Props = {
  doPlayerTurn: Function,
  chooseSymbol: Function,
  grid: Array
}

export class TTT extends Component {
  props: Props;

  componentWillMount() {
    this.props.chooseSymbol(SYMBOLS.X) //Temporary
  }
  doRandomTurn = ({grid, symbols: {player}, doPlayerTurn}) => () => {
    const randomMove = createRandomMove(grid, player).move
    doPlayerTurn(randomMove)
  }

  render() {
    const {grid, doPlayerTurn, chooseSymbol} = this.props

    console.log(grid)
    return (
      <div>
        <Grid data={grid}/>
        <button onClick={this.doRandomTurn(this.props)}>Turn</button>
      </div>
    )
  }
}

const mapStateToProps = ({ttt}) => {
  const {grid, symbols} = ttt
  return {grid, symbols}
}
const mapDispatchToProps = {
  doPlayerTurn, chooseSymbol
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TTT)
