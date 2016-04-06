import React, {PropTypes} from 'react'
import _ from 'lodash'

type Props = {
  onSearch: PropTypes.func.isRequred,
  token: PropTypes.string.isRequred
};
export class SearchBar extends React.Component {
  props: Props;

  handleChange = (ev) => {
    console.log(ev.target)
    this.props.onSearch(ev.target.value)
  }

  render () {
    const {
      onSearch,
      token
    } = this.props

    return (
      <div>
        <input type="search"
               placeholder="Search smth..."
               onChange={_.throttle(this.handleChange, 1500, {trailing: false})}
               value={this.props.token} />
      </div>
    )
  }
}

export default SearchBar

