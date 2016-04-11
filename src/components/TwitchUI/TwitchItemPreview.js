import React, {PropTypes, Component} from 'react'
import {Row, Col, Image} from 'react-bootstrap'

type Props = {
  display_name: PropTypes.string.isRequired,
  bio: PropTypes.string,
  logo: PropTypes.string
};
export class TwitchItemPreview extends Component {
  props: Props;

  render () {
    const {
      display_name,
      bio,
      logo
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
        </Col>
      </Row>
    )
  }
}

export default TwitchItemPreview

