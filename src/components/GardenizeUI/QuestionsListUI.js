import React, {Component, PropTypes} from 'react'
import QuestionPreview from './QuestionPreview'
import ItemsList from '../common/ItemsList'
import Filter from './Filter'
import NewQuestion from "../../forms/NewQuestionForm"

class QuestionsListUI extends Component {
  render() {
    const {
      questions,
      filters,
      loaded,
      postNewQuestion
    } = this.props

    return (
      <div>
        <Filter filters={filters} />
        <NewQuestion onSubmit={postNewQuestion} />

        <hr />

        {loaded ? 
          <ItemsList data={questions} Item={QuestionPreview} />
          : 
          <h3>Loading...</h3>
        }
      </div>
    )
  }
}

export default QuestionsListUI
