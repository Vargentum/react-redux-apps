import React, {PropTypes, Component} from 'react'
import {Link} from 'react-router'

type Props = {
  question: PropTypes.string.isRequired,
  author: PropTypes.string
};

class QuestionPreview extends Component {
  props: Props;

  render () {
    const {
      id,
      question,
      author
    } = this.props

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

