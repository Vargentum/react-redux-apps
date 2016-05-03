import React, {Component} from 'react'
import {Link} from 'react-router'
import QuestionDetails from '../../containers/gardenize/QuestionDetails'

class QuestionDetailsView extends Component {

  render() {
    return (
      <div>
        <div style={{padding: "15px 0"}}>
          <Link to="/gardenize">Back to questions list</Link>
        </div>
        <QuestionDetails {...this.props} />
      </div>
    )
  }
}

export default QuestionDetailsView
