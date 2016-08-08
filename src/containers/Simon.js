// flow

import React, {PropTypes, Component} from 'react'
import stamp from 'stamp'
import { connect } from 'react-redux'
import * as actions from 'redux/modules/Simon'

type Props = {

}

const Simon = stamp.compose({
  render() {
    const abc = (a: number): Object => { console.log('1') }
    return <div>
      Hello Simon stamp
      <button onClick={abc}>Click</button>
    </div>
  }
})


const mapStateToProps = ({Simon}) => ({
  ...Simon
})
const mapDispatchToProps = {...actions}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Simon)
