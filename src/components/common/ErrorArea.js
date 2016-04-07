import React, {Component, PropTypes} from 'react'

class ErrorArea extends Component {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string,
      message: PropTypes.string
    }).isRequired
  }

  render() {
    const { error: {name, message} } = this.props

    return (
      <div className="f-box f-align--2-2 f-dir--col">
        <h3>{name || "Unknown Error"}</h3>
        <p>{message}</p>
      </div>
    )
  }
}

export default ErrorArea
