import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ItemsList from '../components/common/ItemsList'
import QuestionPreview from '../components/GardenizeUI/QuestionPreview'
import {loadQuestionsList} from '../redux/modules/Gardenize'

type Props = {
  questions: PropTypes.array.isRequired,
  loadQuestionsList: PropTypes.func.isRequired,
  questionsLoaded: PropTypes.bool.isRequired
};

export class Gardenize extends Component {
  props: Props;

  componentDidMount () {
    this.props.loadQuestionsList()
  }

  render () {
    const {
      questions,
      questionsLoaded
    } = this.props


    return questionsLoaded ? 
      (<ItemsList data={questions} Item={QuestionPreview} />)
      : 
      (<h3>Loading...</h3>)
  }
}

const mapStateToProps = ({gardenize}) => {
  const {questions, questionsLoaded} = gardenize
  return {questions, questionsLoaded}
}
const mapDispatchToProps = {
  loadQuestionsList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gardenize)





