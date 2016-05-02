import React, {Component, PropTypes} from 'react'
import _ from 'lodash'

class Filter extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired
  }

  state = {
    checkedIndex: 0
  }

  handleAction = (action, idx) => () => {
    this.setState({
      checkedIndex: idx
    });
    action()
  }

  r_filter = ({label, filter}, index) => {
    const name = _.uniqueId('filter-')
    return <label key={_.uniqueId()} className="f-box f-align--21-1 f-gap--M">
      <input 
        onChange={this.handleAction(filter, index)}
        type='radio' 
        name={name} 
        checked={index === this.state.checkedIndex} />
      {label}
    </label>
  }
    
  render() {
    const {
      filters
    } = this.props

    const filterInputs = _(filters)
      .toArray()
      .map(this.r_filter)
      .value()

    return (
      <div className="f-box f-align--21-1 f-gap--L">
        <h5>Filters:</h5> 
        {filterInputs}
      </div>
    )
  }
}

export default Filter
