import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

type Props = {

}
export class Calculator extends Component {
  props: Props;

  render() {
    const {
      test
    } = this.props

    return (
      <div>Calculator</div>
    )
  }
}

const mapStateToProps = ({Calculator}) => {
  // const {} = Calculator
  return {}
}
const mapDispatchToProps = {
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator)
