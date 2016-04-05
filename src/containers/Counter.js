import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import {actions} from "../redux/modules/counterCustom"

type Props = {
  counter: PropTypes.number,
  increment: PropTypes.func
}
export class Counter extends React.Component {
  props: Props;

  render() {
    const {counter, increment} = this.props

    return (
      <div>
        {counter}
        <button onClick={increment}>++</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {counter} = state
  return {counter}
}
const mapDispatchToProps = {
  increment: actions.increment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
