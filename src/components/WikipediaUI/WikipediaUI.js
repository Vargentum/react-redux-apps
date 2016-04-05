import React from 'react'
import SearchBar from '../common/SearchBar'

type Props = {
  response: PropTypes.array.isRequired,
  error: ProptTypes.object,
  loading: PropTypes.book,
  searchWiki: PropTypes.func,
  token: PropTypes.string
};
export class WikipediaUI extends React.Component {
  props: Props;

  render () {
    const {
      loading,
      searchWiki,
      token,
      response
    } = this.props

    return (
      <div>
        <SearchBar onSearch={searchWiki} token={token} />
        {loading ?
          <h4>Loading...</h4>
          :
          <h6>{response.toString()}</h6>
        }
      </div>
    )
  }
}


export default WikipediaUI

