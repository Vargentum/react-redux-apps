import React from 'react'
import Twitch from '../../containers/Twitch'
import CommonView from '../CommonView'

class TwitchView extends React.Component {
  render () {
    return (
      <CommonView
        title="FreeCodeCamp Twitch.tv"
        description="There is a simple application retreiving a list of twitch.tv users, that streams coding."
        criteriaUrl="https://www.freecodecamp.com/challenges/use-the-twitchtv-json-api"
        sourceCodeUrl="https://github.com/Vargentum/react-redux-apps/tree/twitch"
        Component={Twitch}
      />
    )
  }
}

export default TwitchView
