import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import * as actions from 'redux/modules/CamperLeaderboard'

type Props = {

}
export class CamperLeaderboard extends Component {
  props: Props;

  render() {
    const {

    } = this.props

    return (
      <div>hello camper</div>
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
