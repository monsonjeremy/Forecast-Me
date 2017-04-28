// @flow

import React from 'react'
import PropTypes from 'prop-types'
import DayContainer from './DayContainer'

type Props = {
  forecast: Object,
}

const ForecastBox = ({ forecast }: Props) =>
  <div className="forecast-box container">
    {forecast.dateStamp.map(date =>
      <div key={date} className="day-box">
        <DayContainer date={date} />
      </div>,
    )}
  </div>

ForecastBox.propTypes = {
  forecast: PropTypes.instanceOf(Object).isRequired,
}

export default ForecastBox
