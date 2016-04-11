import React, {PropTypes, Component} from 'react'
import SearchResults from '../common/SearchResults'
import TwitchItemPreview from './TwitchItemPreview'

type Props = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  loaded: PropTypes.bool
};

export class TwitchUI extends Component {
  props: Props;

  render () {
    const {data, loading, loaded} = this.props
    return (
      <div>
        {data && data.length ?
          <SearchResults data={data} Item={TwitchItemPreview} />
          :
          "Loading..."
        }
      </div>
    )
  }
}

export default TwitchUI

