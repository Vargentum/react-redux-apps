import React, {Component, PropTypes} from 'react'
import { reduxForm } from 'redux-form'
import {Button, Input} from "react-bootstrap"

export const fields = []

const validate = (values) => {
  const errors = {}

  if (!values.question) {
    errors.question = "Question shouldn't be empty"
  }
  if (!values.author) {
    errors.author = "Username shouldn't be empty"
  }

  return errors
}

export class NewQuestion extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    fields: PropTypes.object  
  }

  defaultProps = {
    fields: {}
  }

  render() {
    const { fields: {question, author}, handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Input type="text" bsStyle={question.error ? "error" : 'success'} placeholder="Your question" {...question} />
        <Input type="text" bsStyle={author.error ? "error" : 'success'} placeholder="Your name" {...author} />
        <Button type="submit">Post new Question</Button>
      </form>
    )
  }
}

NewQuestion = reduxForm({
  form: 'NewQuestion',
  fields: ['question', 'author'],
  validate
})(NewQuestion)

export default NewQuestion
