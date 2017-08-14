import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

// Reducer imports

// Stylesheets imports
import './stylesheets/index.css'

const store = createStore(
  combineReducers({
    redux: 1,
  }),
  // eslint-disable-next-line no-underscore-dangle
  process.env.NODE_ENV === 'production'
    ? undefined
    : // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
