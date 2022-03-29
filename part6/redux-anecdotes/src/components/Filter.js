import { connect } from 'react-redux'
import { createdFilter } from "../reducers/filterReducer"

const Filter = (props) => {

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={(evt) => props.createdFilter(evt.target.value)} />
    </div>
  )
}

const mapDispatchToProps = {
  createdFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter