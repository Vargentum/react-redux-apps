import React, {Component, PropTypes} from 'react'
import {Jumbotron} from 'react-bootstrap'
import AnswersList from './answers/AnswersList'
import NewAnswerForm from '../../forms/NewItemForm/NewAnswerForm'
import NewItemForm from "../../forms/NewItemForm"


class QuestionDetailsUI extends Component {

  render() {
    const {answersLoaded, questionLoaded, answersList, questionData, postNewAnswer} = this.props
    const {id, question, author} = questionData

    console.log(NewAnswerForm)

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
        <NewItemForm
          onSubmit={postNewAnswer}
          Form={NewAnswerForm} 
          showBtnLabel="Answer for this question"
          successAlertContent="Thanks for your answer!" />
      </div>
    )
  }
}

export default QuestionDetailsUI
