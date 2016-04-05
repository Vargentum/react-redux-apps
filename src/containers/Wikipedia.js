import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import WikipediaUI from 'components/WikipediaUI/WikipediaUi'
import {searchWiki} from 'redux/modules/Wikipedia'
// import { bindActionCreators } from 'redux'

type Props = {
  response: PropTypes.array.isRequired,
  error: ProptTypes.object,
  loading: PropTypes.book,
  searchWiki: PropTypes.func,
  token: PropTypes.string
}
export class Wikipedia extends React.Component {
  props: Props;

  render() {
    return (
      <div>
        <WikipediaUI {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = ({wikipedia}) => {
  const {response, error, loading, token} = wikipedia
  return {response, error, loading, token}
}

const mapDispatchToProps = {
  searchWiki
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wikipedia)
