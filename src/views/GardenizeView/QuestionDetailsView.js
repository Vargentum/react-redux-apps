import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import QuestionDetails from '../../containers/gardenize/QuestionDetails'

class QuestionDetailsView extends Component {

  render() {
    return (
      <div>
        <Link to="/gardenize">Back to questions list</Link>
        <QuestionDetails {...this.props} />
      </div>
    )
  }
}

export default QuestionDetailsView
