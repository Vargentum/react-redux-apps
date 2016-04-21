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
        {queque ? 
          <Input value={queque} type="text" />
          : 
          null
        }
      </div>
    )
  }
}

export default Display

