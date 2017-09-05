import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import { reducer as burgerMenu } from 'redux-burger-menu'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

// Reducer imports
import dataReducer from './reducers/data'
import appStateReducer from './reducers/appState'

// General stylesheet imports
import './stylesheets/index.css'
import './stylesheets/Icons.css'

const store = createStore(
  combineReducers(
    {
      appData: dataReducer,
      appState: appStateReducer,
      burgerMenu,
    },
    applyMiddleware(thunk)
  ),
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
