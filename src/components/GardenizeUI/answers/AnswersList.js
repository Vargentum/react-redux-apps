import React, {Component, PropTypes} from 'react'
import Answer from './Answer'
import ItemsList from '../../common/ItemsList'

class AnswersList extends Component {
  render() {
    const {data} = this.props
    console.log(data)

    return (
      <div>
        <h4>Answers list: </h4>
        <ItemsList data={data} Item={Answer} />
      </div>
    )
  }
}

export default AnswersList
