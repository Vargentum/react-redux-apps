/*@flow*/

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {doPlayerTurn, chooseSymbol} from '../redux/modules/ttt/ttt'
import {toReadableGrid} from '../redux/modules/ttt/utils'

type Props = {
  doPlayerTurn: Function, 
  chooseSymbol: Function,
  grid: Array
}

export class TTT extends Component {
  props: Props;

  render() {
    const {grid, doPlayerTurn, chooseSymbol} = this.props

    return (
      <div>
        {toReadableGrid(grid)}
        <button onClick={() => doPlayerTurn({x:1,y:1})}>Turn</button>
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
