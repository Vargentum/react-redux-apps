import React, {Component, PropTypes} from 'react'

class WikiArticlePreview extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    snippet: PropTypes.string,
    titlesnippet: PropTypes.string,
    fullurl: PropTypes.string.isRequired,
    pageid: PropTypes.number.isRequired
  }

  render() {
    const {
      title,
      snippet,
      titlesnippet,
      fullurl
    } = this.props

    return (
      <article>
        <h4><a href={fullurl} target="_blank">
          {titlesnippet.length ?
            <span dangerouslySetInnerHTML={{__html: titlesnippet}} />
            :
            title
          }
        </a></h4>
        <p dangerouslySetInnerHTML={{__html: snippet}} />
      </article>
    )
  }
}

export default WikiArticlePreview
