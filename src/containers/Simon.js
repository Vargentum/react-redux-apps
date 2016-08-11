// flow

import React, {PropTypes, Component} from 'react'
import stamp from 'stamp'
import { connect } from 'react-redux'
import * as _actions from 'redux/modules/Simon'
import * as ui from 'components/SimonUI/Simon'

const {GAME_STATUSES, GAME_MODE, GAME_SECTORS, GAME_MAX_LEVEL, ...actions} = _actions


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
    const lgth = this.state.repeatedFlashes.length || 1
    const originFlashes = _.last(this.props.flashes)
    const originFlashesSec = _.take(originFlashes, lgth)
    const isValidInput = _.isEqual(this.state.repeatedFlashes, originFlashesSec)
    console.log(originFlashes, originFlashesSec, isValidInput)

    if (isValidInput) {
      if (originFlashes.length === lgth) {
        this.props.level === GAME_MAX_LEVEL
          ? this.props.finishGame() /*??*/
          : this.props.goToNextLevel()
      }
    } else {
      this.resetLevel()
      this.props.mode === GAME_MODE.strict
        && this.props.resetGame()
    }
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
  render() {
    const {changeGameStatus} = this.props
    return <div>
      <ui.Translator
        flashRow={_.last(this.props.flashes)}
        beforeStart={::this.beforeTranslationStart}
        afterEnd={::this.afterTranslationEnd}
        onSectorClick={::this.handleUserClick}
        />
      <ui.Control level={this.props.level} onClick={this.props.goToNextLevel} />
    </div>
  }
})

const mapStateToProps = ({simon}) => ({
  ...simon
})
console.log(actions)
const mapDispatchToProps = {...actions}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Simon)
