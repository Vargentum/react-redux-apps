import React, {PropTypes} from 'react'
import _ from 'lodash'

type Props = {
  searchByToken: PropTypes.func.isRequred,
  searchRandom: PropTypes.func
};
export class SearchBar extends React.Component {
  props: Props;

  state = {
    token: 'position'
  }

  updateToken = (ev) => {
    this.setState({
      token: ev.target.value
    });
  }

  render () {
    const { searchByToken, searchRandom } = this.props
    const { token } = this.state

    return (
      <div>
        <input type="search"
               placeholder="Search smth..."
               onChange={this.updateToken}
               value={this.state.token} />
        <button onClick={() => searchByToken(token)}>Search</button>
        <button onClick={searchRandom}>Random</button>
      </div>
    )
  }
}

export default SearchBar

