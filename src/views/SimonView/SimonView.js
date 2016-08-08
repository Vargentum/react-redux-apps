import React, {Component} from 'react'
import Simon from 'containers/Simon'
import CommonView from 'views/CommonView'

type Props = {

};
export class TTTView extends Component {
  props: Props;

  render () {
    return (
      <CommonView
        title="Simon game"
        description="Check you mind :)"
        criteriaUrl="https://www.freecodecamp.com/challenges/build-a-simon-game"
        sourceCodeUrl="https://github.com/Vargentum/react-redux-apps/tree/simon-game"
        Component={Simon}
      />
    )
  }
}

export default TTTView
