import React, {Component} from 'react'
import Markdown from 'containers/Markdown'
import CommonView from 'views/CommonView'

type Props = {

};

export class MarkdownView extends Component {
  props: Props;

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
