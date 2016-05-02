import React from 'react'
import Gardenize from '../../containers/Gardenize'
import CommonView from '../CommonView'

class GardenizeView extends React.Component {
  render () {
    return (
      <CommonView
        title="Test application for Gardenize"
        description="There is a simple QA platform as a skills-proof for junior javascript developer position."
        criteriaUrl="https://docs.google.com/document/d/1FUJ-dnKqeVGJBJ7YaeexeYK7HpusfxLR5K-Lr8ZPJac"
        sourceCodeUrl="https://github.com/Vargentum/react-redux-apps/tree/gardenize"
        Component={Gardenize}
      />
    )
  }
}

export default GardenizeView
