import React from 'react'
import Twitch from '../../containers/Twitch'

import {Grid, Row, Jumbotron} from 'react-bootstrap'

type Props = {

};

class TwitchView extends React.Component {
  props: Props;

  render () {
    return (
      <Grid>
        <Row>
          <Jumbotron>
            <h2>FreeCodeCamp Twitch.tv</h2>
            <p>
              There is a simple application retreiving a list of twitch.tv users, that streams coding.
              <br />
              App builded according to these <a target="_blank"
                href="https://www.freecodecamp.com/challenges/use-the-twitchtv-json-api">criteria.</a>
            </p>
            <p>
              You can check out the source code <a target="_blank"
              href="https://github.com/Vargentum/react-redux-apps/tree/twitch">here.</a>
            </p>
            <h6>by Vargentum</h6>
          </Jumbotron>

          <Twitch />
        </Row>
      </Grid>
    )
  }
}

export default TwitchView
