// @flow

import React from 'react'
import PropTypes from 'prop-types'
import DayContainer from './DayContainer'

type Props = {
  forecast: Object,
  isSpot: boolean,
}

let counter = 0
const ForecastBox = ({ forecast, isSpot }: Props) =>
  <div className="forecast-box container">
    {forecast.dateStamp.map((date, index) => {
      counter += 1
      return (
        <div key={`${date}${counter}`} className="day-box">
          <DayContainer
            date={date}
            forecast={forecast}
            forecastDay={index}
            isSpot={isSpot}
          />
        </div>
      )
    },
    )}
  </div>

ForecastBox.propTypes = {
  forecast: PropTypes.instanceOf(Object).isRequired,
  isSpot: PropTypes.bool.isRequired,
}

export default ForecastBox
