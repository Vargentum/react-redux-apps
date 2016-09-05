import React from 'react'
import _ from 'lodash'
import {Link} from 'react-router'
import {Row, Jumbotron, ListGroup, ListGroupItem} from 'react-bootstrap'

const Projects = {
  'Front-end Simple': [
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
      link: 'markdown',
      name: 'Simple markdown editor'
    },
    {
      link: 'leaderboard',
      name: 'Freecodecamp users leaderboard'
    }
  ],
  'Front-end Advanced': [
    {
      link: 'calculator',
      name: 'Calculator with keyboard support'
    },
    {
      link: 'pomodoro',
      name: 'Pomodoro technique timer'
    },
    {
      link: 'ttt',
      name: 'Tic Tac Toe with random moving AI'
    },
    {
      link: 'simon',
      name: 'Simon Game'
    }
  ]
}

export class HomeView extends React.Component {
  r_subSection ({link, name}) {
    return <ListGroupItem key={link + name}>
      <Link to={link}>{name}</Link>
    </ListGroupItem>
  }
  r_section(data, name) {
    return <div>
      <h4>{name} projects:</h4>
      {data.map(::this.r_subSection)}
    </div>
  }
  render () {
    return (
      <Row>
        <Jumbotron>
          <h2>Glad to see you, stranger :)</h2>
          <p>My name is Vlad, and I'm building applications to pass the FreeCodeCamp FrontEnd serticifation.</p>
          <p>All of them builded with React and Redux. Here the full list:</p>
          <ListGroup>
            {_.map(Projects,::this.r_section)}
          </ListGroup>
        </Jumbotron>
      </Row>
    )
  }
}

export default HomeView
