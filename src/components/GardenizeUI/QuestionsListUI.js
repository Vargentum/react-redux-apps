import React, {Component, PropTypes} from 'react'
import QuestionPreview from './QuestionPreview'
import ItemsList from '../common/ItemsList'
import Filter from './Filter'

class QuestionsListUI extends Component {
  render() {
    const {
      questions,
      filters,
      loaded
    } = this.props

    return (
      <div>
        <Filter filters={filters} />
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
