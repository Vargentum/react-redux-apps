import React, { PropTypes } from 'react'
import {Grid} from 'react-bootstrap'
import '../../styles/core.scss'

export class CoreLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element
  }

  render () {
    return (
      <Grid>
        {this.props.children}
      </Grid>
    )
  }
}

export default CoreLayout
