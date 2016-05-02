import React, {Component, PropTypes} from 'react'
import QuestionPreview from './QuestionPreview'
import ItemsList from '../common/ItemsList'

class QuestionsListUI extends Component {
  render() {
    const {
      questions,
      loaded
    } = this.props
    

    return loaded ? 
      (<ItemsList data={questions} Item={QuestionPreview} />)
      : 
      (<h3>Loading...</h3>)
  }
}

export default QuestionsListUI
