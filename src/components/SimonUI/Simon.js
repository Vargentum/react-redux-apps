// @flow

import React, {PropTypes as PT, Component} from 'react'
import _ from 'lodash'
import cls from 'classnames'
import {GAME_STATUSES, GAME_MODE, GAME_SECTORS} from 'redux/modules/Simon'
import * as style from 'styles/Simon.styl'
import {Button, Glyphicon, Input, Tooltip, OverlayTrigger} from 'react-bootstrap'

/* -----------------------------
  Board
----------------------------- */
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
      const currentIndex = _.findIndex(_.keys(secs), (k) => k === name)
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

/* -----------------------------
  Controls
----------------------------- */
const TippedCheckbox = ({tip, ...props}) =>
  <div className="f-box f-align--21-1 f-gap--S">
    <Input type="checkbox"{...props} />
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip id='tooltip'>{tip}</Tooltip>}
      >
      <b>?</b>
    </OverlayTrigger>
  </div>

export const Control = ({
  level, maxLevel, onGameStart, onGameReset,
  onStrictModeSwitch, isStrictMode,
  onHardModeSwitch, isHardMode,
  allowToStart, allowToReset
}) =>
  <div className={style.control}>
    <h2>Level: {level} of {maxLevel}</h2>
    <div className="f-box f-align--21-1 f-gap--M">
      <Button bsStyle="primary" disabled={!allowToStart} onClick={onGameStart}>Start Game</Button>
      <Button bsStyle="warning" disabled={!allowToReset} onClick={onGameReset}>Reset Game</Button>
    </div>
    <div className="f-box f-align--21-1 f-gap--M">
      <TippedCheckbox
        label="Strict mode"
        tip="First error will reset all your level progress to zero"
        checked={isStrictMode}
        onChange={onStrictModeSwitch} />
      <TippedCheckbox
        label="Hard mode"
        tip="No duplicated highlights"
        checked={isHardMode}
        onChange={onHardModeSwitch} />
    </div>
  </div>

/* -----------------------------
  Translator
----------------------------- */
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
  componentDidUpdate (prevProps, prevState) {
    if (!_.isEqual(prevProps.flashRow, this.props.flashRow)
        && !_.isEmpty(this.props.flashRow)) {
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
    const {flashes, disableRepeat, onSectorClick, ...props} = this.props
    return (
      <div className={style.translator}>
        <SectorsBoard
          onSectorClick={onSectorClick}
          activeSector={this.state.activeSector}
          />
        <Button
          bsStyle="success"
          className={style.translatorRefresh}
          onClick={::this.makeTranslationCycle}
          disabled={disableRepeat}>
          <Glyphicon glyph="repeat" />
        </Button>
      </div>
    )
  }
}
