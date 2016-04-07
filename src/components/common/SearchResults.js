import React, { Component, PropTypes } from 'react'
import _ from "lodash"

type Props = {
  data: PropTypes.array.isRequired
};

class SearchResults extends Component {
  props: Props;

  r_items() {
    const {data} = this.props

    return data.map(({title, snippet, titlesnippet, link}) => <li key={_.uniqueId()}>
      <article>
        <h3><a href={link}>
          {titlesnippet.length ? 
            <span dangerouslySetInnerHTML={{__html: titlesnippet}} />
            :
            title
          }
        </a></h3>
        <p dangerouslySetInnerHTML={{__html: snippet}} />
      </article>
    </li>)}

  render() {
    return (
      <ul>
        {this.r_items()}
      </ul>
    )
  }
}

export default SearchResults
