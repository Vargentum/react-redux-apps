import React, {Component, PropTypes} from 'react'
import {Media} from 'react-bootstrap'

class Answer extends Component {
  static propTypes = {
    id: PropTypes.number,
    answer: PropTypes.string.isRequired,
    author: PropTypes.string,
    votes: PropTypes.number
  }

  render() {
    const {
      answer, author, votes
    } = this.props

    return (
      <Media>
        <Media.Body>
          <p>{answer}</p>
          <Media.Heading>
            <div className="f-box f-gap--L">
              <p>Author: {author} </p>
              <p>Votes: {votes}</p>
            </div>
          </Media.Heading>
        </Media.Body>
      </Media>
    )
  }
}

export default Answer
