import coreState from './core-state'
import { actions } from './core-actions'

const core = (state = coreState, action) => {
  switch (action.type) {
    case actions.SET_PARAMS:
      let urlParams = {}

      // eslint-disable-next-line
      for (let x in action.params) {
        urlParams[x] = action.params[x]
      }

      return Object.assign({}, state, {
        urlParams
      })
    default:
      return state
  }
}

export default core
