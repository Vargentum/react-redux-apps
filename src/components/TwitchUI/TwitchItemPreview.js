import React, {PropTypes, Component} from 'react'
import {Row, Col, Image, Alert} from 'react-bootstrap'

function StreamView(props) {
  const {
    stream: {
      viewers,
      average_fps,
      channel: {
        game,
        status,
        url
      }
    }
  } = props

  return (
    <Alert bsStyle="success">
      <h5>User is streaming: <a target="_blank"
                                href={url}>{game + " " + status}</a></h5>
      <div className="f-box f-gap--L">
        <span>Average fps: <b>{average_fps}</b></span>
        <span>Viewers: <b>{viewers}</b></span>
      </div>
    </Alert>
  )
}

function NoStreamView(props) {
  return (
    <Alert bsStyle="info">User is offline</Alert>
  )
}

function ErrorStreamView(props) {
  const {
    error,
    message
  } = props

  return (
    <Alert bsStyle="danger">Error: {message}</Alert>
  )
}

export class TwitchItemPreview extends Component {
  render () {
    const {
      display_name,
      bio,
      logo,
      error,
      stream
    } = this.props
    return (
      <Row>
        <Col xs={2}>
          <Image src={logo || "http://fakeimg.pl/200x200/?text=No Image"}
                 rounded responsive />
        </Col>
        <Col xs={10}>
          <h4>{display_name}</h4>
          <p>{bio}</p>
          {error ?
            <ErrorStreamView {...this.props} />
            :
            stream ?
              <StreamView {...this.props} />
              :
              <NoStreamView {...this.props} />
          }
        </Col>
      </Row>
    )
  }
}

TwitchItemPreview.propTypes = {
  display_name: PropTypes.string.isRequired,
  bio: PropTypes.string,
  logo: PropTypes.string,
  error: PropTypes.string,
  message: PropTypes.string,
  stream: PropTypes.shape({
    viewers: PropTypes.number.isRequired,
    average_fps: PropTypes.number.isRequired,
    channel: PropTypes.shape({
      game: PropTypes.string,
      status: PropTypes.string,
      url: PropTypes.string
    }).isRequired
  })
}

export default TwitchItemPreview

