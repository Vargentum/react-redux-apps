import React from 'react'
import SearchBar from '../common/SearchBar'
import SearchResults from "../common/SearchResults"
import WikiArticlePreview from './WikiArticlePreview'
import ErrorArea from '../common/ErrorArea'
import {WIKI_RANDOM_ARTICLE_URL} from '../../redux/modules/Wikipedia'

type Props = {
  results: PropTypes.array.isRequired,
  error: ProptTypes.object,
  loaded: PropTypes.bool,
  loading: PropTypes.bool,
  searchWiki: PropTypes.func
};

export class WikipediaUI extends React.Component {
  props: Props;

  render () {
    const {
      loading,
      loaded,
      searchWiki,
      results,
      error
    } = this.props

    return (
      <div>
        <SearchBar searchByToken={searchWiki}
                   randomResultUrl={WIKI_RANDOM_ARTICLE_URL} />
        {loading ?
          <h3 className="f-box f-align--1-2">Loading...</h3>
          :
          error ?
            <ErrorArea error={error} />
            :
            loaded && !results.length ?
              <h3 className="f-box f-align--1-2">Sorry, no results. Try another search.</h3>
              :
              <SearchResults data={results} Item={WikiArticlePreview} />
        }
      </div>
    )
  }
}

export default WikipediaUI
