import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import * as actions from 'redux/modules/CamperLeaderboard'

type Props = {

}
export class CamperLeaderboard extends Component {
  props: Props;

  render() {

    return (
      <div>hello camper
        <button onClick={this.props.loadUsers}>Load campers</button>
      </div>
    )
  }
}

const mapStateToProps = ({CamperLeaderboard}) => ({
  ...CamperLeaderboard
})
const mapDispatchToProps = {...actions}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CamperLeaderboard)
