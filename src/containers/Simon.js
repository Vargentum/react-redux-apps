import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import * as actions from 'redux/modules/Simon'

type Props = {

}
export class Simon extends Component {
  props: Props;

  render() {
    const {
      test
    } = this.props

    return (
      <div>Hello Simon</div>
    )
  }
}

const mapStateToProps = ({Simon}) => ({
  ...Simon
})
const mapDispatchToProps = {...actions}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Simon)
