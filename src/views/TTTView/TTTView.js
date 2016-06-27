import React, {Component} from 'react'
import TTT from 'containers/TTT'
import CommonView from 'views/CommonView'

type Props = {

};
export class TTTView extends Component {
  props: Props;

  render () {
    return (
      <CommonView
        title="Tic-Tac-Toe game"
        description="Old-good game with unbeatable AI"
        criteriaUrl="https://www.freecodecamp.com/challenges/build-a-tic-tac-toe-game"
        sourceCodeUrl="https://github.com/Vargentum/react-redux-apps/tree/tic-tac-toe"
        Component={TTT}
      />
    )
  }
}

export default TTTView
