import React, {Component} from 'react'
import Markdown from 'containers/Markdown'
import CommonView from 'views/CommonView'

export class MarkdownView extends Component {
  render () {
    return (
      <CommonView
        title="Simple markdown editor"
        description={`Transform your text to markdown`}
        criteriaUrl="https://www.freecodecamp.com/challenges/build-a-markdown-previewer"
        sourceCodeUrl="https://github.com/Vargentum/react-redux-apps/tree/markdown-previewer"
        Component={Markdown}
      />
    )
  }
}

export default MarkdownView
