import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'

type Props = {

}
export class TTT extends Component {
  props: Props;

  render() {
    const {grid} = this.props

    return (
      <div>hello TTT</div>
    )
  }
}

const mapStateToProps = ({ttt}) => {
  const {grid} = ttt
  return {}
}
const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TTT)
