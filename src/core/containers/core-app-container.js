import { connect } from 'react-redux'
import CoreApp from '../components/core-app'
import { processTransaction } from '../core-actions'

const mapStateToProps = (state) => {
  return {
    coreState: state.core
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    processTransaction: (coreState, callback) => {
      processTransaction(dispatch, coreState, callback)
    }
  }
}

const CoreAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoreApp)

export default CoreAppContainer
