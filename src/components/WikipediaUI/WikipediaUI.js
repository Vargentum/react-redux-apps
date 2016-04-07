import React from 'react'
import SearchBar from '../common/SearchBar'
import SearchResults from "../common/SearchResults"
import WikiArticlePreview from './WikiArticlePreview'

type Props = {
  results: PropTypes.array.isRequired,
  error: ProptTypes.object,
  loading: PropTypes.book,
  searchWiki: PropTypes.func
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
        <SearchBar searchByToken={searchWiki} />
        {loading ?
          <h4>Loading...</h4>
          :
          <SearchResults data={results} Item={WikiArticlePreview} />
        }
      </div>
    )
  }
}

export default WikipediaUI
