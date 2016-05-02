import React, {Component, PropTypes} from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import _ from 'lodash'

class ItemsList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    Item: PropTypes.element.isRequired,
    itemProps: PropTypes.object
  }

  static defaultProps = {
    data: [],
    itemProps: {}
  }

  r_item = (Item, props) => <ListGroupItem key={_.uniqueId()} {...this.props.itemProps}>
    <Item {...props} />
  </ListGroupItem>

  render() {
    const {
      data,
      Item
    } = this.props
    
    return (
      <ListGroup>
        {data.map(this.r_item.bind(this, Item))}
      </ListGroup>
    )
  }
}

export default ItemsList
