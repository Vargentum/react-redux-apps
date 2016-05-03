import _ from 'lodash'
import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ItemsList from '../../components/common/ItemsList'
import QuestionsListUI from '../../components/GardenizeUI/QuestionsListUI'
import {
    loadQuestionsList, 
    filterQuestionsBy, 
    filters, 
    postNewQuestion } from '../../redux/modules/gardenize/QuestionsList'


export class QuestionsList extends Component {
  static propTypes = {
    questions: PropTypes.array.isRequired,
    loadQuestionsList: PropTypes.func.isRequired,
    filterQuestionsBy: PropTypes.func,
    postNewQuestion: PropTypes.func,
    loaded: PropTypes.bool.isRequired
  }

  componentDidMount () {
    this.props.loadQuestionsList()
  }

  makeFiltersDispatched = (value, key) => {
    return Object.assign({}, value, {
      filter: () => this.props.filterQuestionsBy(key)
    })
  }

  render () {
    return <QuestionsListUI
              filters={_.mapValues(filters, this.makeFiltersDispatched)}
              {...this.props} />
  }
}

const mapStateToProps = ({gardenizeQuestionsList}) => {
  const {questions, loaded} = gardenizeQuestionsList
  return {questions, loaded}
}
const mapDispatchToProps = {
  loadQuestionsList,
  filterQuestionsBy,
  postNewQuestion
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsList)
