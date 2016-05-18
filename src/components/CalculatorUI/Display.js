import React, {PropTypes, Component} from 'react'
import {Input} from 'react-bootstrap'
import styles from '../../styles/Calculator.styl'

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
        <Input value={calculationResult} type="text" 
               bsSize="large"
               placeholder="Result Display"
               className={styles.display} />
        <Input value={queque} type="text" 
               bsSize="small"
               placeholder="Calculation Queque Display"
               className={styles.display} />
      </div>
    )
  }
}

export default Display

