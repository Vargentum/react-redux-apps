import React from 'react'
import Wikipedia from '../../containers/Wikipedia'
import CommonView from '../CommonView'

export class WikipediaView extends React.Component {
  render () {
    return (
      <CommonView
        title="Wikipedia Viewer"
        description="Provide simple search application via Wikipedia API"
        criteriaUrl="https://www.freecodecamp.com/challenges/build-a-wikipedia-viewer"
        sourceCodeUrl="https://github.com/Vargentum/react-redux-apps/tree/wikipedia-viewer"
        Component={Wikipedia}
      />
    )
  }
}

export default WikipediaView
