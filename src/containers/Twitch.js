import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import {loadAllUsers} from '../redux/modules/Twitch'
import TwitchUI from '../components/TwitchUI/TwitchUI'

type Props = {

}
export class Twitch extends React.Component {
  props: Props;

  componentDidMount() {
    this.props.loadAllUsers()
  }

  render() {
    return (
      <TwitchUI {...this.props} />
    )
  }
}

const mapStateToProps = ({twitch}) => {
  const {loading, loaded, data} = twitch
  return {loading, loaded, data}
}
const mapDispatchToProps = {
  loadAllUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Twitch)
