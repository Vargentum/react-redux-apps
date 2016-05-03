import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import QuestionDetailsUI from '../../components/GardenizeUI/QuestionDetailsUI'
import {getQuestionData, getAnswersFromIdList} from '../../redux/modules/gardenize/QuestionDetails'

export class QuestionDetails extends Component {
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
    }).isRequired
  }

  componentDidMount () {
    const {getQuestionData, params: {id}} = this.props
    getQuestionData(parseInt(id))
  }

  componentWillReceiveProps ({questionLoaded, answersLoaded, getAnswersFromIdList, questionData: {answers}}) {
    if (questionLoaded && !answersLoaded) getAnswersFromIdList(answers)
  }

  render () {
    return <QuestionDetailsUI {...this.props} />
  }
}

const mapStateToProps = ({gardenizeQuestionDetails}) => {
  const {questionData, answersList, questionLoaded, answersLoaded} = gardenizeQuestionDetails
  return {questionData, answersList, questionLoaded, answersLoaded}
}
const mapDispatchToProps = {
  getQuestionData,
  getAnswersFromIdList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionDetails)
