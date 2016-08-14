import React, {Component} from 'react'
import Simon from 'containers/Simon'
import CommonView from 'views/CommonView'

type Props = {

};
export class SimonView extends Component {
  props: Props;

  render () {
    return (
      <CommonView
        title="Simon game"
        description={`
          You should remember and repeat up to 20 items sequence of flashes.
          For real heros there are hard and strict mode available :)
        `}
        criteriaUrl="https://www.freecodecamp.com/challenges/build-a-simon-game"
        sourceCodeUrl="https://github.com/Vargentum/react-redux-apps/tree/simon-game"
        Component={Simon}
      />
    )
  }
}

export default SimonView
