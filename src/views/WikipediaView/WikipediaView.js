import React from 'react'
import Wikipedia from '../../containers/Wikipedia'
import {Grid, Row, Jumbotron} from 'react-bootstrap'

type Props = {

};

export class WikipediaView extends React.Component {
  props: Props;

  render () {
    return (
      <Grid>
        <Row>
          <Jumbotron>
            <h2>FreeCodeCamp Wikipedia Viewer</h2>
            <p>
              Provide simple search application according to these <a target="_blank"
              href="https://www.freecodecamp.com/challenges/build-a-wikipedia-viewer">criteria.</a>
            </p>
            <p>
              You can check the source code <a target="_blank"
              href="https://github.com/Vargentum/react-redux-apps/tree/wikipedia-viewer">here.</a>
            </p>
            <h6>by Vargentum</h6>
          </Jumbotron>
          <Wikipedia />
        </Row>
      </Grid>
    )
  }
}

export default WikipediaView
