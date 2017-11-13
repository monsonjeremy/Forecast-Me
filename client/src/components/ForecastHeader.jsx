// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { convertMetersToFeet } from '../helpers/helperFunctions'

import '../stylesheets/ForecastHeader.css'

type Props = {
  date: Array<string>,
  spotName: string,
  buoy: Object,
}

const ForecastHeader = ({ date, spotName, buoy, }: Props) => {
  const userTimezone = moment.tz.guess()
  const buoyTimeUTC = moment.utc(
    `${buoy['#YY'].data}/${buoy.MM.data}/${buoy.DD.data} ${buoy.hh.data}:${buoy.mm.data}`,
    'YYYY-MM-DD HH:mm'
  )

  const buoyTimeLocal = moment.tz(buoyTimeUTC, userTimezone).format('L LT z')

  return (
    <div className="day-container">
      <div className="day-header">
        <div className="day-date-title full-width text-center">
          <h1 className="section-title spot-name">{spotName}</h1>
          <h2 className="section-subtitle forecast-date">{date}</h2>
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
              Buoy Swell Direction: {buoy.SwD.data} - {buoy.MWD.data}&#176;
            </h3>
          </div>
        </div>
        <div className="buoy-last-updated">
          <p>Buoy data last updated: {buoyTimeLocal}</p>
        </div>
      </div>
    </div>
  )
}

ForecastHeader.propTypes = {
  spotName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  buoy: PropTypes.instanceOf(Object).isRequired,
}

ForecastHeader.defaultProps = {}

export default ForecastHeader
