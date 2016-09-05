import React, {Component, PropTypes} from 'react'
import {Row, Jumbotron} from 'react-bootstrap'
import {Link} from 'react-router'

type Props = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  criteriaUrl: PropTypes.string.isRequired,
  sourceCodeUrl: PropTypes.string.isRequired,
  Component: PropTypes.component.isRequired
};

class CommonView extends Component {
  props: Props;

  static defaultProps = {
    usedLibraries: []
  }

  render () {
    const {title, usedLibraries, description, criteriaUrl, sourceCodeUrl, Component} = this.props

    return (
      <Row>
        <Jumbotron>
          <Link to="/">Back to apps list</Link>
          <h2>{title}</h2>
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
          {!!usedLibraries.length &&
            <p>
              Used libraries: {usedLibraries.join(', ')}.
            </p>
          }
          <h6>by Vargentum</h6>
        </Jumbotron>

        <Component />
      </Row>
    )
  }
}

export default CommonView
