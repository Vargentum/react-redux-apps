import React, {Component, PropTypes} from 'react'
import QuestionPreview from './QuestionPreview'
import ItemsList from '../common/ItemsList'
import Filter from './Filter'
import NewQuestionForm from '../../forms/NewItemForm/NewQuestionForm'
import NewItemForm from "../../forms/NewItemForm"


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
        <NewItemForm 
          onSubmit={postNewQuestion}
          Form={NewQuestionForm} 
          showBtnLabel="Create a new question"
          successAlertContent="Your question has been created!" />
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
