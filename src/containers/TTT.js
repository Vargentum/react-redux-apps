/*@flow*/

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {doPlayerTurn, chooseSymbol} from '../redux/modules/ttt/ttt'
import {toReadableGrid, SYMBOLS, createRandomMove} from '../redux/modules/ttt/utils'

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

    return (
      <div>
        {toReadableGrid(grid)}
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
