import React, {Component, PropTypes} from 'react'
import QuestionPreview from './QuestionPreview'
import ItemsList from '../common/ItemsList'
import Filter from './Filter'
import NewQuestion from "../../forms/NewQuestionForm"
import {Button, Alert} from 'react-bootstrap'
import _ from 'lodash'


class QuestionsForm extends Component {
  state = {
    form: false,
    success: false
  }

  toggleVisibility = (type, state = null) => {
    this.setState({
      [type]: state || !this.state[type]
    });
  }

  handleSuccessSubmit = () => {
    this.toggleVisibility('form', false)
    this.toggleVisibility('success', true)
  }

  r_formVisibilityToggler = (text) => {
    return <Button onClick={_.partial(this.toggleVisibility, 'form')}>{text}</Button>
  }

  r_successAlert = () => {
    if (this.state.success) {
      return (
        <Alert bsStyle="success"
               onDismiss={_.partial(this.toggleVisibility, 'success', false)} 
               dismissAfter={2000}>
          <h4>Question posted!</h4>
        </Alert>
      )
    }
  }
    
  render() {
    const {form} = this.state

    return (
      <div>
        {form ? 
          <NewQuestion {...this.props}
                       footerComponent={this.r_formVisibilityToggler("Hide Form")}
                       onSuccessSubmit={this.handleSuccessSubmit} />
          : 
          this.r_formVisibilityToggler("Ask a Question")
        }
        {this.r_successAlert()}
      </div>
    )
  }
}



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
        <QuestionsForm onSubmit={postNewQuestion} />
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
