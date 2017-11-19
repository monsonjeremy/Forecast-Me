// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import '../stylesheets/SunTimes.css'

type Props = {
  sunrise: number,
  sunset: number,
}

const SunTimes = ({ sunrise, sunset, }: Props) => (
  <div className="suntimes-forecast-container">
    <div className="sunrise-container suntime flex-col-centered">
      <figure className="suntimes-icon sunrise-icon" />
      <h3>Sunrise: {moment(sunrise * 1000).format('h:mm a')}</h3>
    </div>
    <div className="sunset-container suntime flex-col-centered">
      <figure className="suntimes-icon sunset-icon" />
      <h3>Sunset: {moment(sunset * 1000).format('h:mm a')}</h3>
    </div>
  </div>
)

SunTimes.propTypes = {
  sunrise: PropTypes.number.isRequired,
  sunset: PropTypes.number.isRequired,
}

SunTimes.defaultProps = {}

export default SunTimes
