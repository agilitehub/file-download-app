import Thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// Core and Custom Reducers
import coreReducer from './core-reducer'
import appReducer from '../app/app-reducer'

import Enums from '../utils/enums'

// Configure Redux Store
const coreState = combineReducers({
  core: coreReducer,
  app: appReducer
})

// Configure middleware
const devTools = process.env.NODE_ENV === Enums.VALUES.ENV_PRODUCTION ? applyMiddleware(Thunk) : composeWithDevTools(applyMiddleware(Thunk))
export default createStore(coreState, {}, devTools)
