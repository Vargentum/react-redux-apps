import React, { Component, PropTypes } from 'react'

type Props = {
  data: PropTypes.array.isRequired
};
class SearchResults extends Component {
  props: Props;

  r_items() {
    const {data} = this.props

    return data.map(({title, subTitle, link}) => <li key={link}>
      <article>
        <h3><a href={link}>{title}</a></h3>
        <h5>{subTitle}</h5>
      </article>
    </li>
    )
  }

  render() {
    return (
      <ul>
        {this.r_items()}
      </ul>
    )
  }
}

export default SearchResults
