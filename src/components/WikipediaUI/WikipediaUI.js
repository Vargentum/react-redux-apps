import React from 'react'
import SearchBar from '../common/SearchBar'
import SearchResults from "../common/SearchResults"
import WikiArticlePreview from './WikiArticlePreview'
import {WIKI_RANDOM_ARTICLE_URL} from '../../redux/modules/Wikipedia'

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
        <SearchBar searchByToken={searchWiki}
                   randomResultUrl={WIKI_RANDOM_ARTICLE_URL} />
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
