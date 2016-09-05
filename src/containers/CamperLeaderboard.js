import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import * as actions from 'redux/modules/CamperLeaderboard'
import * as ui from 'components/CamperLeaderboardUI/CamperLeaderboard'
import {Table, Column, Cell} from 'fixed-data-table'

require('!style!css!fixed-data-table/dist/fixed-data-table-base.min.css')
require('!style!css!fixed-data-table/dist/fixed-data-table-style.min.css')

function cellory (data, type) {
  return function _Cell ({rowIndex, ...props}) {
    const value = data[rowIndex][type]
    return <Cell {...props} className="test">
      {type === 'img' 
        ? <img style={{width: 30, height: 30}} src={value} /> 
        : value
      }
    </Cell>
  }
}

type Props = {

}
export class CamperLeaderboard extends Component {
  props: Props;
  static tableWidth = 960
  static columnsTotal = 4
  static imgColumnWidth = 50

  r_cell (type) {
    return cellory(this.props.users, type)
  }

  componentDidMount () {
    this.props.loadUsers()
  }

  render() {
    const {users, loadUsers} = this.props
    const otherColumnWidth = (CamperLeaderboard.tableWidth - CamperLeaderboard.imgColumnWidth) / (CamperLeaderboard.columnsTotal - 1)

    return (
      <div>
        <Table
          rowsCount={users.length}
          headerHeight={50}
          rowHeight={50}
          width={CamperLeaderboard.tableWidth}
          height={500}
          >
          <Column
            width={CamperLeaderboard.imgColumnWidth}
            header={<Cell>Img</Cell>}
            cell={this.r_cell('img')}/>
          <Column
            width={otherColumnWidth}
            header={<Cell>Username</Cell>}
            cell={this.r_cell('username')}/>
          <Column
            width={otherColumnWidth}
            header={<Cell>Recent</Cell>}
            cell={this.r_cell('recent')}/>
          <Column
            width={otherColumnWidth}
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
