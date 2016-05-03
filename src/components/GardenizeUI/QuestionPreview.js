import React, {PropTypes, Component} from 'react'
import {Link} from 'react-router'

class QuestionPreview extends Component {
  static propTypes = {
    id: PropTypes.number,
    question: PropTypes.string.isRequired,
    author: PropTypes.string
  }
  render () {
    const { id, question, author } = this.props
    return (
      <div>
        <h4>
          <Link to={`/gardenize/${id}`}>{question}</Link>
        </h4>
        <p>{author}</p>
      </div>
    )
  }
}

export default QuestionPreview
