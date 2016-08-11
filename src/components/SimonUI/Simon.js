// @flow

import React, {PropTypes as PT, Component} from 'react'
import _ from 'lodash'
import cls from 'classnames'
import {GAME_STATUSES, GAME_MODE, GAME_SECTORS} from 'redux/modules/Simon'
import * as style from 'styles/Simon.styl'

const Sector = ({onClick, mod, active, index}) =>
  <div 
    onClick={_.partial(onClick, index)}
    className={cls({
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
        index={currentIndex}
        key={name}
        mod={name}
        onClick={onSectorClick}
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
    flashRow: PT.array,
    beforeStart: PT.func,
    afterEnd: PT.func
  }
  static defaultProps = {
    flashRow: [],
    beforeStart: _.identity,
    afterEnd: _.identity
  }
  static defaultState = {
    activeSector: -1
  }
  state = {
    ...Translator.defaultState
  }
  componentDidMount () {
    this.makeTranslationCycle()
  }
  componentDidUpdate (prevProps, prevState) {
    if (!_.isEqual(prevProps.flashRow, this.props.flashRow)) {
      this.makeTranslationCycle()
    }
  }
  translationToPromise(sector, idx) {
    return new Promise((resolve, reject) => {
      _.delay(_.partial(this.makeFlash, resolve), idx * 1500, sector)
    })
  }
  doTranslations() {
    const translations = this.props.flashRow.map(::this.translationToPromise)
    return Promise.all(translations)
  }
  makeTranslationCycle() {
    Promise
      .resolve(this.props.beforeStart())
      .then(::this.doTranslations)
      .then(::this.props.afterEnd)
  }
  makeFlash = (resolve, sector) => {
    this.setState({
      activeSector: sector
    }, () => _.delay(_.partial(this.makeUnflash, resolve), 500))
  }
  makeUnflash = (resolve) => {
    this.setState({
      activeSector: Translator.defaultState.activeSector
    }, resolve())
  }
  render() {
    const {flashes, onSectorClick, ...props} = this.props
    return (
      <SectorsBoard 
        onSectorClick={onSectorClick} 
        activeSector={this.state.activeSector} />
    )
  }
}
