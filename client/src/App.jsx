// @flow

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ForecastPageContainer from './containers/ForecastPageContainer'

const App = () => (
  <div className="app">
    <Switch>
      <Route exact path="/" component={ForecastPageContainer} />
      <Route path="/forecast" component={ForecastPageContainer} />
      <Route path="/info" component={ForecastPageContainer} />
    </Switch>
  </div>
)

export default App
