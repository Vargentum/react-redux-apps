import React, { Component, PropTypes } from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import _ from 'lodash'

type Props = {
  data: PropTypes.array.isRequired,
  Item: PropTypes.element.isRequired
};

class SearchResults extends Component {
  props: Props;

  r_items() {
    const {data, Item} = this.props

    return data.map((itemProps) => <ListGroupItem key={_.uniqueId()}>
      <Item {...itemProps} />
    </ListGroupItem>) }

  render() {
    return (
      <ListGroup>
        {this.r_items()}
      </ListGroup>
    )
  }
}

export default SearchResults
