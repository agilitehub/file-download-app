import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { getQueryParams } from './utils/utilities'
import CoreAppContainer from './core/containers/core-app-container'
import * as serviceWorker from './serviceWorker'

import 'antd/dist/antd.css'
import './index.css'

import core from './core/core-reducer'

// Setup Reducers
const indexReducerWrapper = combineReducers({
  core
})

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

let store = createStoreWithMiddleware(indexReducerWrapper,
  window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
)

// Process URL Parameters
let url = new URL(window.location.href)
let params = getQueryParams(url.search)

if (params) {
  store.dispatch({
    type: 'SET_PARAMS',
    params: params
  })
}

ReactDOM.render(
  <Provider store={store}>
    <CoreAppContainer />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
