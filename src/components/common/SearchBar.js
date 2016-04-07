import React, {PropTypes} from 'react'

type Props = {
  searchByToken: PropTypes.func.isRequred,
  randomResultUrl: PropTypes.string
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
    const { searchByToken, randomResultUrl } = this.props
    const { token } = this.state

    return (
      <div>
        <input type="search"
               placeholder="Search smth..."
               onChange={this.updateToken}
               value={token} />
        <button onClick={() => searchByToken(token)}>Search</button>
        {randomResultUrl ? 
          <a target="_blank" href={randomResultUrl}>Random Article</a>
          :
          null
        }
      </div>
    )
  }
}

export default SearchBar

