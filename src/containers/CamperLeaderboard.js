import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import * as actions from 'redux/modules/CamperLeaderboard'
import * as ui from 'components/CamperLeaderboardUI/CamperLeaderboard'
import Table from 'responsive-fixed-data-table'
import {Column, Cell} from 'fixed-data-table'

function cellory (data, type) {
  return function Cell ({rowIndex, ...props}) {
    return <div>
      {data[rowIndex][type]}
    </div>
  }  
}


type Props = {

}
export class CamperLeaderboard extends Component {
  props: Props;

  r_cell (type) {
    return cellory(this.props.users, type)
  }

  componentDidMount () {
    this.props.loadUsers()
  }

  render() {
    const {users, loadUsers} = this.props
    return (
      <div>
        <Table
          rowsCount={users.length}
          headerHeight={50}
          rowHeight={50}
          width={500}
          >
          <Column
            width={100} 
            header={<Cell>Image</Cell>} 
            cell={this.r_cell('img')}/>
          <Column
            width={100} 
            header={<Cell>Username</Cell>} 
            cell={this.r_cell('username')}/>
          <Column
            width={100} 
            header={<Cell>Recent</Cell>} 
            cell={this.r_cell('recent')}/>
          <Column
            width={100} 
            header={<Cell>Alltime</Cell>} 
            cell={this.r_cell('alltime')}/>
        </Table>
      </div>
    )
  }
}
/*username:"ndburrus"
img:"https://avatars.githubusercontent.com/u/15148847?v=3"
alltime:1484
recent:679
lastUpdate:"2016-08-21T12:06:18.722Z"*/

const mapStateToProps = ({CamperLeaderboard}) => ({
  ...CamperLeaderboard
})
const mapDispatchToProps = {...actions}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CamperLeaderboard)
