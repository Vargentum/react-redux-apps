import React, {PropTypes, Component} from 'react'
import {Input} from 'react-bootstrap'

type Props = {
  queque:             PropTypes.array,
  calculationResult:  PropTypes.number
};
export class Display extends Component {
  props: Props;

  render () {
    const {
      queque,
      calculationResult
    } = this.props

    return (
      <div>
        <Input value={calculationResult} type="text" />
        <Input value={queque} type="text" />
      </div>
    )
  }
}

export default Display

