import React, {PropTypes} from 'react'
import {Input, Button} from 'react-bootstrap'

type Props = {
  searchByToken: PropTypes.func.isRequred,
  randomResultUrl: PropTypes.string
};
export class SearchBar extends React.Component {
  props: Props;

  state = {
    token: ''
  }

  updateToken = (ev) => {
    this.setState({
      token: ev.target.value
    })
  }

  handleSearchRequest = (ev) => {
    ev.preventDefault()
    this.props.searchByToken(this.state.token)
  }

  render () {
    const { randomResultUrl } = this.props
    const { token } = this.state

    return (
      <form className="f-box f-dir--col f-align--2-2" style={{height: '150px'}}
            onSubmit={this.handleSearchRequest}>
        <div className="f-box f-align--1-2 f-gap--L">
          <Input style={{width: "300px"}}
                 bsSize="large"
                 type="search"
                 placeholder="Search smth..."
                 onChange={this.updateToken}
                 value={token} />
          <Button type="submit"
                  bsStyle="primary"
                  bsSize="large"
                  disabled={!token.length}>Search</Button>
        </div>
        {randomResultUrl ?
          <Button target="_blank"
                  bsStyle="link"
                  bsSize="large"
                  href={randomResultUrl}>Random Article</Button>
          :
          null
        }
      </form>
    )
  }
}

export default SearchBar

