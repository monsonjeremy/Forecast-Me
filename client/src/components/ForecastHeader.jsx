// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { convertMetersToFeet } from '../helpers/helperFunctions'

import '../stylesheets/ForecastHeader.css'

type Props = {
  date: Array<string>,
  spotName: string,
  buoy: Object,
}

const ForecastHeader = ({ date, spotName, buoy, }: Props) => {
  // Format the date in the Title section of the container ('Wed June 21st')
  const dateTitle = moment(date[0], 'MMMM DD, YYYY HH:mm:ss').format('ddd MMMM Do')
  return (
    <div className="day-container">
      <div className="day-header">
        <div className="day-date-title full-width text-center">
          <h1 className="section-title spot-name">{spotName}</h1>
          <h2 className="section-subtitle forecast-date">{dateTitle}</h2>
        </div>
        <div className="day-data-header-container">
          <div className="data-header-item">
            <h3>
              Buoy Swell Height:{' '}
              {Math.round(10 * convertMetersToFeet(parseFloat(buoy.SwH.data))) / 10} ft
            </h3>
          </div>
          <div className="data-header-item">
            <h3>
              Buoy Swell Period: {buoy.SwP.data} {buoy.SwP.units}
            </h3>
          </div>
          <div className="data-header-item">
            <h3>
              Buoy Swell Direction: {buoy.MWD.data} {buoy.MWD.units}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

ForecastHeader.propTypes = {
  spotName: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Array).isRequired,
  buoy: PropTypes.instanceOf(Object).isRequired,
}

ForecastHeader.defaultProps = {}

export default ForecastHeader
