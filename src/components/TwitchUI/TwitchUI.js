import React, {PropTypes, Component} from 'react'
import SearchResults from '../common/SearchResults'
import TwitchItemPreview from './TwitchItemPreview'
import ErrorArea from '../common/ErrorArea'

type Props = {
  users: PropTypes.array.isRequired,
  streams: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any
};

export class TwitchUI extends Component {
  props: Props;

  render () {
    const {users, streams, loading, error} = this.props
    const data = users.map((user, i) => Object.assign({}, user, streams[i]))
    return (
      <div>
        {loading ?
          <h3>Loading...</h3>
          :
          error ?
            <ErrorArea error={error} />
            :
            <SearchResults data={data} Item={TwitchItemPreview} />
        }
      </div>
    )
  }
}

export default TwitchUI

