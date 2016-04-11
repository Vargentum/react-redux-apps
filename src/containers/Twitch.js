import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

type Props = {

}
export class Twitch extends React.Component {
  props: Props;

  render() {
    return (
      <div></div>
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
)(Twitch)
