import React, {PropTypes, Component} from 'react'
import {Button} from 'react-bootstrap'

type Props = {
  updateActiveNumber: PropTypes.func,
  doOperation:        PropTypes.func,
  doReset:            PropTypes.func,
  convertToFloat:     PropTypes.func
};
export class Keyboard extends Component {
  props: Props;

  render () {
    const {
      updateActiveNumber,
      doOperation,
      doReset,
      convertToFloat
    } = this.props

    return (
      <div>
        <Button onClick={_.partial(updateActiveNumber, 1)}>1</Button>
        <Button onClick={_.partial(updateActiveNumber, 5)}>5</Button>
        <Button onClick={_.partial(doOperation, 'plus')}>+</Button>
      </div>
    )
  }
}

export default Keyboard

