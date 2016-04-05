import React from 'react'
import Counter from 'containers/Counter'

type Props = {

};
export class CounterView extends React.Component {
  props: Props;

  render () {
    return (
      <div>counter view
        <Counter />
      </div>
    )
  }
}

export default CounterView
