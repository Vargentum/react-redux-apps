import React from 'react'
import SearchBar from '../common/SearchBar'
import SearchResults from "../common/SearchResults"

type Props = {
  results: PropTypes.array.isRequired,
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
      results
    } = this.props

    return (
      <div>
        <SearchBar onSearch={searchWiki} token={token} />
        {loading ?
          <h4>Loading...</h4>
          :
          <SearchResults data={results} />
        }
      </div>
    )
  }
}

export default WikipediaUI
