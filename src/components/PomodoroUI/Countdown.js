import React, {Component, PropTypes} from 'react'

class Countdown extends Component {
  static propTypes = {
    time: PropTypes.string
  }

  render() {
    const {
      time, children
    } = this.props

    return (
      <div>{time}, {children}</div>
    )
  }
}

export default Countdown
