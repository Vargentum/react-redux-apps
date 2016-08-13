// flow

import React, {PropTypes, Component} from 'react'
import stamp from 'stamp'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as _actions from 'redux/modules/Simon'
import * as ui from 'components/SimonUI/Simon'
import soundManager, {SimonSounds} from 'utils/soundManager'

const {GAME_STATUSES, GAME_SECTORS, GAME_MAX_LEVEL, ...actions} = _actions

const Simon = stamp.compose({
  displayName: 'SimonContainer',
  state: {
    repeatedFlashes: []
  },
  handleUserClick(sectorIdx) {
    if (this.props.status !== GAME_STATUSES.waitingForUserInput) return
    this.updateRepeatedFlash(sectorIdx)
  },
  updateRepeatedFlash(val) {
    this.setState({
      repeatedFlashes: [...this.state.repeatedFlashes, val]
    }, ::this.compareFlashes)
  },
  compareFlashes() {
    const enteredCount = this.state.repeatedFlashes.length || 1
    const properFlashes = _.last(this.props.flashes)
    const properFlashesToCompare = _.take(properFlashes, enteredCount)
    const isValidInput = _.isEqual(this.state.repeatedFlashes, properFlashesToCompare)
    console.log(properFlashes, properFlashesToCompare, isValidInput)

    if (isValidInput) {
      this.onSuccessInput()
      if (properFlashes.length === enteredCount) {
        this.onLevelComplete()
      }
    } else {
      this.onInvalidInput()
    }
  },
  onSuccessInput() {
    soundManager.play(SimonSounds.success)
    console.log('success input')
  },
  onInvalidInput() {
    soundManager.play(SimonSounds.error)
    this.resetLevel()
    this.props.isStrict && this.props.resetGame()
    console.log('invalid input')
  },
  onLevelComplete() {
    soundManager.play(SimonSounds.levelComplete)
    this.props.level === GAME_MAX_LEVEL
      ? this.onGameFinish()
      : this.props.goToNextLevel()
  },
  onGameFinish() {
    alert('Congrats! You have just completed the game.')
  },
  beforeTranslationStart() {
    this.props.changeGameStatus(GAME_STATUSES.generateHighlighting)
  },
  afterTranslationEnd() {
    this.props.changeGameStatus(GAME_STATUSES.waitingForUserInput)
    this.setState({
      repeatedFlashes: []
    })
  },
  resetLevel() {
    this.props.changeGameStatus(GAME_STATUSES.error)
    this.props.changeGameStatus(GAME_STATUSES.waitingForUserInput)
    this.setState({
      repeatedFlashes: []
    })
  },
  handleGameStart() {
    this.props.goToNextLevel()
  },
  render() {
    const {changeGameStatus} = this.props
    return <div>
      <ui.Translator
        flashRow={_.last(this.props.flashes)}
        beforeStart={::this.beforeTranslationStart}
        afterEnd={::this.afterTranslationEnd}
        onSectorClick={::this.handleUserClick}
        disableRepeat={this.props.status !== GAME_STATUSES.waitingForUserInput}
        />
      <ui.Control
        level={this.props.level}
        maxLevel={GAME_MAX_LEVEL}
        onGameStart={::this.handleGameStart}
        onGameReset={::this.props.resetGame}
        onStrictModeSwitch={::this.props.toggleStrictMode}
        onHardModeSwitch={::this.props.toggleHardMode}
        isStrictMode={this.props.isStrict}
        isHardMode={this.props.isHard}
        />
    </div>
  }
})

const mapStateToProps = ({simon}) => ({
  ...simon
})
const mapDispatchToProps = {...actions}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Simon)
