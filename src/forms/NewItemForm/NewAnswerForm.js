import React, {Component, PropTypes} from 'react'
import { reduxForm } from 'redux-form'
import {Button, Input} from "react-bootstrap"
import _ from 'lodash'

export const fields = []

const validate = (values) => {
  const errors = {}

  if (!values.answer) {
    errors.answer = "Answer shouldn't be empty"
  }
  if (!values.author) {
    errors.author = "Author field shouldn't be empty"
  }
  
  return errors
}

export class NewAnswerForm extends Component {
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
    const { fields: {answer, author}, errors, handleSubmit, footerComponent } = this.props
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <Input type="textarea" bsStyle={answer.error ? "error" : 'success'} 
               placeholder="Your answer"
               label={answer.error} 
               {...answer} />
        <Input type="text" bsStyle={author.error ? "error" : 'success'} 
              placeholder="Your name" 
              label={author.error} 
              {...author} />
        <div className="f-box f-gap--L">
          <Button type="submit" disabled={!_.isEmpty(errors)}>Create Answer</Button>
          {footerComponent}
        </div>
      </form>
    )
  }
}

NewAnswerForm = reduxForm({
  form: 'NewAnswerForm',
  fields: ['answer', 'author'],
  validate
})(NewAnswerForm)

export default NewAnswerForm
