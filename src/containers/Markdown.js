import React, {PropTypes, Component} from 'react'
import marked from 'marked'
import * as ui from 'components/MarkdownUI/Markdown'
import * as style from 'styles/Markdown.styl'

export default class Markdown extends Component {

  state = {
    input: `
Hello markdown
===

[Markup cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Here-Cheatsheet#links)
    `,
    output: ''
  }
  componentDidMount () {
    this.inputToOutput(this.state.input)
  }

  inputToOutput(input) {
    this.setState({
      input,
      output: marked(input)
    })
  }

  handleInputUpdate(e) {
    this.inputToOutput(e.target.value)
  }

  render() {
    const {input, output} = this.state
    return (
      <div className={style.wrapper}>
        <ui.Input onUpdate={::this.handleInputUpdate} value={input} />
        <ui.Output
          dangerouslySetInnerHTML={{__html: output}} />
      </div>
    )
  }
}
