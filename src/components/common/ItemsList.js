import React, {Component, PropTypes} from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import _ from 'lodash'

type Props = {
  data: PropTypes.array.isRequired,
  Item: PropTypes.component.isRequired,
  itemProps: PropTypes.object,
  listProps: PropTypes.object
};
class ItemsList extends Component {
  props: Props;

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
