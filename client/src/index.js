/* eslint-disable react/jsx-filename-extension */

import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'

import thunk from 'redux-thunk'
import { BrowserRouter, Route } from 'react-router-dom'
import { reducer as burgerMenu } from 'redux-burger-menu'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

// Reducer imports
import dataReducer from './reducers/data'
import appStateReducer from './reducers/appState'

// General stylesheet imports
import './stylesheets/index.css'
import './stylesheets/Icons.css'

const isDev = process.env.NODE_ENV !== 'production'

const middleWares = []
middleWares.push(thunk)

// Logger Middleware. This always has to be last
const loggerMiddleware = createLogger({
  predicate: () => isDev,
})
middleWares.push(loggerMiddleware)

const reducers = combineReducers({
  appData: dataReducer,
  appState: appStateReducer,
  burgerMenu,
})

const createStoreWithMiddleware = applyMiddleware(...middleWares)(createStore)
const makeStore = () =>
  createStoreWithMiddleware(
    reducers,
    isDev
      ? // eslint-disable-next-line no-underscore-dangle
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      : undefined
  )

const store = makeStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
