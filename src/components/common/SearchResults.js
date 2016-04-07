import React, { Component, PropTypes } from 'react'
import _ from "lodash"

type Props = {
  data: PropTypes.array.isRequired,
  Item: PropTypes.element.isRequired 
};

class SearchResults extends Component {
  props: Props;

  r_items() {
    const {data, Item} = this.props

    return data.map((itemProps) => <li key={_.uniqueId()}>
      <Item {...itemProps} />
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
