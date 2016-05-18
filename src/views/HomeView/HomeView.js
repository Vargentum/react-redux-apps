import React from 'react'
import {Link} from 'react-router'
import {Row, Jumbotron, ListGroup, ListGroupItem} from 'react-bootstrap'

const Projects = [
  {
    link: 'wikipedia',
    name: 'Wikipedia Viewer'
  },
  {
    link: 'twitch',
    name: 'Twitch.tv Streamers Table'
  },
  {
    link: 'gardenize',
    name: 'Simple Q/A service for Gardenize junior js developer position'
  },
  {
    link: 'calculator',
    name: 'Calculator with keyboard support'
  },
  {
    link: 'pomodoro',
    name: 'Pomodoro timer'
  }
]

export class HomeView extends React.Component {
  render () {
    return (
      <Row>
        <Jumbotron>
          <h2>Glad to see you, stranger :)</h2>
          <p>My name is Vlad, and I'm building applications to pass the FreeCodeCamp FrontEnd serticifation.</p>
          <p>All of them builded with React and Redux. Here the full list:</p>
          <ListGroup>
            {Projects.map(({link, name}) => <ListGroupItem
              key={link + name}
              >
              <Link to={link}>{name}</Link>
            </ListGroupItem>
            )}
          </ListGroup>
        </Jumbotron>
      </Row>
    )
  }
}

export default HomeView
