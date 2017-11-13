// @flow

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ForecastPageContainer from './containers/ForecastPageContainer'
import { ErrorBoundary } from './components'

const App = () => (
  <ErrorBoundary>
    <div className="app">
      <Switch>
        <Route exact path="/" component={ForecastPageContainer} />
        <Route path="/forecast" component={ForecastPageContainer} />
        <Route path="/info" component={ForecastPageContainer} />
      </Switch>
    </div>
  </ErrorBoundary>
)

export default App
