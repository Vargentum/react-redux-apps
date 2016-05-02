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
      question,
      author
    } = this.props

    return (
      <div>
        <h3>{question}</h3>
        <p>{author}</p>
        <Link to=""/>
      </div>
    )
  }
}

export default QuestionPreview

