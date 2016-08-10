// @flow

import React, {PropTypes as PT, Component} from 'react'
import _ from 'lodash'
import cls from 'classnames'
import {GAME_SECTORS} from 'redux/modules/Simon'
import * as style from 'styles/Simon.styl'


const Sector = ({onSectorClick, mod, active}): Object =>
// onSectorClick: Function, name: string
  <div className={cls({
    [style.sector]: true,
    [style[`sector-${mod}`]]: true,
    [style[`sector-${mod}Active`]]: active
  })} />

export const SectorsBoard = ({onSectorClick, activeSector}) =>
  <div className={style.sectorsBoard}>
    {_.map(GAME_SECTORS, (props, name, secs) => {
      const currentIndex = _.findIndex(_.keys(secs), k => k === name)
      return <Sector
        active={activeSector === currentIndex}
        key={name}
        mod={name}
        onSectorClick={onSectorClick}
        {...props} />
    }
    )}
  </div>

export const Control = ({level, onClick}) =>
  <div>
    <span>{level}</span>
    <button onClick={onClick}>Go next</button>
  </div>


export class Translator extends Component {
  static propTypes = {
    flashRow: PT.array
  }
  static defaultProps = {
    flashRow: []
  }
  static defaultState = {
    activeSector: -1
  }
  state = {
    ...Translator.defaultState
  }
  componentDidMount () {
    this.startTranslation()
  }
  componentDidUpdate (prevProps, prevState) {
    if (!_.isEqual(prevProps.flashRow, this.props.flashRow)) {
      this.startTranslation()
    }
  }
  startTranslation() {
    this.props.flashRow.forEach((sector, idx) => {
      _.delay(this.makeFlash, idx * 1500, sector)
      }
    )
  }
  makeFlash = (sector) => {
    this.setState({
      activeSector: sector
    }, () => _.delay(this.makeUnflash, 500))
  }
  makeUnflash = () => {
    this.setState({
      activeSector: Translator.defaultState.activeSector
    })
  }
  render() {
    const {flashes, ...props} = this.props
    return (
      <SectorsBoard {...props} activeSector={this.state.activeSector} />
    )
  }
}
