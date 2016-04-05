import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

type Props = {

}
export class Wikipedia extends React.Component {
  props: Props;

  render() {
    return (
      <div>Wiki</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wikipedia)
