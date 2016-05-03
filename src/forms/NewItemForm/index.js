import React, {PropTypes, Component} from 'react'
import {Button, Alert} from 'react-bootstrap'
import _ from 'lodash'

class NewItemForm extends Component {
  static propTypes = {
    Form: PropTypes.element.isRequired,
    showBtnLabel: PropTypes.string,
    hideBtnLabel: PropTypes.string,
    successAlertContent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.renderable,
      PropTypes.element
    ])
  }

  static defaultProps = {
    showBtnLabel: 'Show form',
    hideBtnLabel: 'Hide form',
    successAlertContent: 'Successfully created!'
  }

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
          {this.props.successAlertContent}
        </Alert>
      )
    }
  }
    
  render() {
    const {Form, showBtnLabel, hideBtnLabel} = this.props
    const {form} = this.state
    return (
      <div>
        {form ? 
          <Form {...this.props}
                footerComponent={this.r_formVisibilityToggler(hideBtnLabel)}
                onSuccessSubmit={this.handleSuccessSubmit} />
          : 
          this.r_formVisibilityToggler(showBtnLabel)
        }
        {this.r_successAlert()}
      </div>
    )
  }
}

export default NewItemForm