// @flow

import React from 'react'
import PropTypes from 'prop-types'
import DayContainer from './DayContainer'

type Props = {
  forecast: Object,
  isSpot: boolean,
}

const ForecastBox = ({ forecast, isSpot }: Props) =>
  <div className="forecast-box container">
    {forecast.Surf.dateStamp.map((date, index) =>
      <DayContainer
        date={date}
        forecast={forecast}
        forecastDay={index}
        isSpot={isSpot}
      />,
    )}
  </div>

ForecastBox.propTypes = {
  forecast: PropTypes.instanceOf(Object).isRequired,
  isSpot: PropTypes.bool.isRequired,
}

export default ForecastBox
