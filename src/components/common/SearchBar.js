import React, {PropTypes} from 'react'
import _ from 'lodash'

type Props = {
  onSearch: PropTypes.func.isRequred,
  token: PropTypes.string.isRequred
};
export class SearchBar extends React.Component {
  props: Props;

  state = {
    token: ''
  }

  handleChange = (ev) => {
    _.throttle(this.props.onSearch, 1000)(ev.target.value)
    this.setState({
      token: ev.target.value
    });
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
               onChange={this.handleChange}
               value={this.state.token} />
      </div>
    )
  }
}

export default SearchBar

