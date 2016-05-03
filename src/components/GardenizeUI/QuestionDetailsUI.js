import React, {Component, PropTypes} from 'react'
import {Jumbotron} from 'react-bootstrap'
import AnswersList from './answers/AnswersList'
import NewAnswerForm from '../../forms/NewItemForm/NewAnswerForm'
import NewItemForm from "../../forms/NewItemForm"

class QuestionDetailsUI extends Component {
  static propTypes = {
    getQuestionData: PropTypes.func.isRequired,
    getAnswersFromIdList: PropTypes.func.isRequired,
    answersLoaded: PropTypes.bool,
    questionLoaded: PropTypes.bool,
    answersList: PropTypes.array,
    questionData: PropTypes.shape({
      id: PropTypes.number,
      question: PropTypes.string,
      author: PropTypes.string,
      answers: PropTypes.array
    }).isRequired,
    postNewAnswer: PropTypes.func
  }

  render() {
    const {answersLoaded, answersList, questionData, postNewAnswer} = this.props
    const {question, author} = questionData
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
