// flow

import React, {PropTypes, Component} from 'react'
import stamp from 'stamp'
import { connect } from 'react-redux'
import * as _actions from 'redux/modules/Simon'
import * as ui from 'components/SimonUI/Simon'
import soundManager, {SimonSounds} from 'utils/soundManager'

const {GAME_STATUSES, GAME_MODE, GAME_SECTORS, GAME_MAX_LEVEL, ...actions} = _actions


// const GameController = stamp.compose({

// })

// const flashesController = stamp.compose({

// })


const Simon = stamp.compose({
  displayName: 'SimonContainer',
  state: {
    repeatedFlashes: []
  },
  handleUserClick(sectorIdx) {
    if (this.props.status !== GAME_STATUSES.waitingForUserInput) return
    this.updateRepeatedFlash(sectorIdx)
  },
  updateRepeatedFlash(val){
    this.setState({
      repeatedFlashes: [...this.state.repeatedFlashes, val]
    }, ::this.compareFlashes);
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
    this.props.mode === GAME_MODE.strict && this.props.resetGame()
    console.log('invalid input')
  },
  onLevelComplete() {
    soundManager.play(SimonSounds.levelComplete)
    this.props.level === GAME_MAX_LEVEL
      ? this.props.finishGame() /*??*/
      : this.props.goToNextLevel()
  },
  beforeTranslationStart() {
    this.props.changeGameStatus(GAME_STATUSES.generateHighlighting)
  },
  afterTranslationEnd() {
    this.props.changeGameStatus(GAME_STATUSES.waitingForUserInput)
    this.setState({
      repeatedFlashes: []
    });
  },
  resetLevel() {
    this.props.changeGameStatus(GAME_STATUSES.error)
    this.props.changeGameStatus(GAME_STATUSES.waitingForUserInput)
    this.setState({
      repeatedFlashes: []
    });
  },
  handleGameStart() {
    this.props.goToNextLevel()
  },
  handleStrictModeSwitch() {
    const oppositeMode = this.props.mode === GAME_MODE.strict 
      ? GAME_MODE.normal 
      : GAME_MODE.strict
    this.props.changeGameMode(oppositeMode)
  },
  render() {
    const {changeGameStatus} = this.props
    return <div>
      <ui.Translator
        flashRow={_.last(this.props.flashes)}
        beforeStart={::this.beforeTranslationStart}
        afterEnd={::this.afterTranslationEnd}
        onSectorClick={::this.handleUserClick} />
      <ui.Control 
        level={this.props.level} 
        maxLevel={GAME_MAX_LEVEL}
        onGameStart={::this.handleGameStart}
        onGameReset={::this.props.resetGame} 
        onStrictModeSwitch={::this.handleStrictModeSwitch} 
        isStrictMode={this.props.mode === GAME_MODE.strict} />
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
