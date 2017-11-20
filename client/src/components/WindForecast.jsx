// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import '../stylesheets/WindForecast.css'

type Props = {
  data: Array<{
    date: string,
    windSpeed: number,
    windDirection: number,
  }>,
}

const WindForecast = ({ data, }: Props) => (
  <div className="wind-forecast-container">
    {data.map(d => {
      const transform = `rotate(${d.windDirection}deg)`
      let backgroundColor
      if (d.windSpeed <= 5) backgroundColor = '#23d737'
      else if (d.windSpeed > 5 && d.windSpeed < 10) backgroundColor = '#FFBE00'
      else backgroundColor = '#FA5065'
      return (
        <div className="wind-data-container" key={`${d.date}`}>
          <figure className="wind-arrow wind-arrow-icon" style={{ transform, backgroundColor, }} />
          <h3>{moment(d.date).format('hA')}</h3>
          <h3>{Math.round(d.windSpeed * 10) / 10} knots</h3>
        </div>
      )
    })}
  </div>
)

WindForecast.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      windSpeed: PropTypes.number.isRequired,
      windDirection: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
}

WindForecast.defaultProps = {}

export default WindForecast
