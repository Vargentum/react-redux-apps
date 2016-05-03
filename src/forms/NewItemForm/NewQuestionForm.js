import React, {Component, PropTypes} from 'react'
import { reduxForm } from 'redux-form'
import {Button, Input} from "react-bootstrap"
import _ from 'lodash'

export const fields = []

const validate = (values) => {
  const errors = {}
  const questionMinLength = 10

  if (!values.question) {
    errors.question = "Question shouldn't be empty"
  }
  else if (values.question.length < questionMinLength) {
    errors.question = `Question length should be more than ${questionMinLength}`
  }
  if (!values.author) {
    errors.author = "Username shouldn't be empty"
  }
  
  return errors
}

export class NewQuestionForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onSuccessSubmit: PropTypes.func,
    fields: PropTypes.object,
    footerComponent: PropTypes.element
  }

  defaultProps = {
    fields: {}
  }

  onSubmit(ev) {
    ev.preventDefault()
    this.props.handleSubmit()
    this.props.resetForm()
    this.props.onSuccessSubmit()
  }

  render() {
    const { fields: {question, author}, errors, handleSubmit, footerComponent } = this.props
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <Input type="text" bsStyle={question.error ? "error" : 'success'} 
               placeholder="Your question"
               label={question.error} 
               {...question} />
        <Input type="text" bsStyle={author.error ? "error" : 'success'} 
              placeholder="Your name" 
              label={author.error} 
              {...author} />
        <div className="f-box f-gap--L">
          <Button type="submit" disabled={!_.isEmpty(errors)}>Create Question</Button>
          {footerComponent}
        </div>
      </form>
    )
  }
}

NewQuestionForm = reduxForm({
  form: 'NewQuestionForm',
  fields: ['question', 'author'],
  validate
})(NewQuestionForm)

export default NewQuestionForm
