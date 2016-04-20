import React, {Component, PropTypes} from 'react'
import {Grid, Row, Jumbotron} from 'react-bootstrap'

type Props = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  criteriaUrl: PropTypes.string.isRequired,
  sourceCodeUrl: PropTypes.string.isRequired,
  Component: PropTypes.component.isRequired
};

class CommonView extends Component {
  props: Props;

  render () {
    const {title, description, criteriaUrl, sourceCodeUrl, Component} = this.props

    return (
      <Grid>
        <Row>
          <Jumbotron>
            <h2>FreeCodeCamp {title}</h2>
            <p>
              {description}
              <br />
              App builded according to these <a target="_blank"
                href={criteriaUrl}>criteria.</a>
            </p>
            <p>
              You can check out the source code <a target="_blank"
              href={sourceCodeUrl}>here.</a>
            </p>
            <h6>by Vargentum</h6>
          </Jumbotron>

          <Component />
        </Row>
      </Grid>
    )
  }
}

export default CommonView
