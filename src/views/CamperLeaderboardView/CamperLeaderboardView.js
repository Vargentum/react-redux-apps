import React, {Component} from 'react'
import CamperLeaderboard from 'containers/CamperLeaderboard'
import CommonView from 'views/CommonView'

export class CamperLeaderboardView extends Component {
  render () {
    return (
      <CommonView
        title="Camper Leaderboard"
        description={`Shows brownie's points leaders`}
        criteriaUrl="https://www.freecodecamp.com/challenges/build-a-camper-leaderboard"
        sourceCodeUrl="https://github.com/Vargentum/react-redux-apps/tree/camper-leaderboard"
        Component={CamperLeaderboard}
      />
    )
  }
}

export default CamperLeaderboardView
