import React from 'react'
import { connect } from 'react-redux'
import {loadAllUsers, loadAllStreams} from '../redux/modules/Twitch'
import TwitchUI from '../components/TwitchUI/TwitchUI'

type Props = {
  users: PropTypes.array.isRequired,
  streams: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
  loadAllStreams: PropTypes.func.isRequired,
  loadAllUsers: PropTypes.func.isRequired
};

export class Twitch extends React.Component {
  props: Props;

  componentDidMount() {
    this.props.loadAllUsers()
    this.props.loadAllStreams()
  }

  render() {
    return (
      <TwitchUI {...this.props} />
    )
  }
}

const mapStateToProps = ({twitch}) => {
  const {loading, error, users, streams} = twitch
  return {loading, error, users, streams}
}
const mapDispatchToProps = {
  loadAllUsers,
  loadAllStreams
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Twitch)
