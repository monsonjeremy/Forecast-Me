// @flow

import React from 'react'
import $ from 'jquery'
import Tether from 'tether'
import ForecastPage from './ForecastPage'

window.jQuery = $
window.Tether = Tether
require('bootstrap')

const App = () => <ForecastPage />

export default App
