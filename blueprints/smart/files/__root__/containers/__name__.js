import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import * as actions from 'redux/modules/<%= pascalEntityName %>'

type Props = {

}
export class <%= pascalEntityName %> extends Component {
  props: Props;

  render() {
    const {

    } = this.props

    return (
      <div></div>
    )
  }
}

const mapStateToProps = ({<%= pascalEntityName %>}) => ({
  ...<%= pascalEntityName %>
})
const mapDispatchToProps = {...actions}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= pascalEntityName %>)
