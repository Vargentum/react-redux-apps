// flow

import React, {PropTypes, Component} from 'react'
import stamp from 'stamp'
import { connect } from 'react-redux'
import * as actions from 'redux/modules/Simon'
import * as ui from 'components/SimonUI/Simon'

const Simon = stamp.compose({
  displayName: 'SimonContainer',
  render() {
    return <div>
      <ui.Translator flashRow={_.last(this.props.flashes)} />
      <ui.Control level={this.props.level} onClick={this.props.goToNextLevel} />
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
