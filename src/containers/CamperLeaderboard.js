import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {FETCH_RECENT, FETCH_ALLTIME, loadUsers} from 'redux/modules/CamperLeaderboard'
import * as ui from 'components/CamperLeaderboardUI/CamperLeaderboard'
import {Table, Column, Cell} from 'fixed-data-table'
import cls from 'classnames'

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

type Props = {}
export class CamperLeaderboard extends Component {
  props: Props;
  static tableWidth = 960
  static columnsTotal = 4
  static imgColumnWidth = 50

  state = {
    currentDataType: this.props.initDataType
  }

  onDataRequest(type) {
    if (!this.props.users[type].length) {
      this.props.loadUsers(type)
    }
    this.setState({currentDataType: type});
  }

  r_cell (type) {
    return cellory(this.props.users[this.state.currentDataType], type)
  }

  r_controlCell (label, type) {
    return <Cell
      onClick={_.partial(::this.onDataRequest, type)}
      className={cls('test', {
        'is-active': this.state.currentDataType === type
      })}>{label}</Cell>
  }

  componentDidMount () {
    this.onDataRequest(this.state.currentDataType)
  }

  r_loadingArea() {
    return <Column
      header={<Cell>Loading...</Cell>}
      width={CamperLeaderboard.tableWidth}
      cell={<div />} />
  }

  r_body() {
    const otherColumnWidth = (CamperLeaderboard.tableWidth - CamperLeaderboard.imgColumnWidth) / (CamperLeaderboard.columnsTotal - 1)
    return [
      <Column
        key={0}
        width={CamperLeaderboard.imgColumnWidth}
        header={<Cell>Img</Cell>}
        cell={this.r_cell('img')}/>,
      <Column
        key={1}
        width={otherColumnWidth}
        header={<Cell>Username</Cell>}
        cell={this.r_cell('username')}/>,
      <Column
        key={2}
        width={otherColumnWidth}
        header={this.r_controlCell('Recent', FETCH_RECENT)}
        cell={this.r_cell('recent')}/>,
      <Column
        key={3}
        width={otherColumnWidth}
        header={this.r_controlCell('All time', FETCH_ALLTIME)}
        cell={this.r_cell('alltime')}/>
    ]
  }

  render() {
    const {users, loadUsers, loading} = this.props
    const {currentDataType} = this.state

    return (
      <div>
        <Table
          rowsCount={loading ? 1 : users[currentDataType].length} //reserve one row for empty area
          headerHeight={50}
          rowHeight={50}
          width={CamperLeaderboard.tableWidth}
          height={500}
          >
          {loading 
            ? this.r_loadingArea()
            : this.r_body()
          }
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
const mapDispatchToProps = {loadUsers}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CamperLeaderboard)
