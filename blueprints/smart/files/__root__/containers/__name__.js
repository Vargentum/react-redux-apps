import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

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

const mapStateToProps = ({<%= pascalEntityName %>}) => {
  const {} = <%= pascalEntityName %>
  return {}
}
const mapDispatchToProps = {
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= pascalEntityName %>)
