import React from 'react'
import ReactDOM from 'react-dom'

import { Provider, useSelector } from 'react-redux'
import AgiliteReact from 'agilite-react'

import Enums from './utils/enums'
import store from './core/core-store'

const App = () => {
  // state.core is created using agilite-react-config.js in config folder
  const config = useSelector(state => state.core)
  return <AgiliteReact state={config} />
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById(Enums.VALUES.ROOT_TAG))
