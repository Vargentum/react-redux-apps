import React, {Component, PropTypes} from 'react'
import {Jumbotron} from 'react-bootstrap'
import AnswersList from './answers/AnswersList'

class QuestionDetailsUI extends Component {

  render() {
    const {answersLoaded, questionLoaded, answersList, questionData} = this.props
    const {id, question, author} = questionData

    return (
      <div>
        <Jumbotron>
          <h3>Question: {question}</h3>
          <p>Posted by: {author}</p>
        </Jumbotron>
        {answersLoaded ? 
          <AnswersList data={answersList} />
          :
          <h5>Loading answers...</h5>
        }
      </div>
    )
  }
}

export default QuestionDetailsUI
