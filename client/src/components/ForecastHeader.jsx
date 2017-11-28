// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import Stickyfill from 'stickyfilljs'
import { UnmountClosed } from 'react-collapse'
import { convertMetersToFeet } from '../helpers/helperFunctions'

import '../stylesheets/ForecastHeader.css'

type buoyDataObject = {
  units: string,
  data: string,
}

type Props = {
  date: Array<string>,
  spotName: string,
  buoy: {
    '#YY': buoyDataObject,
    MM: buoyDataObject,
    DD: buoyDataObject,
    hh: buoyDataObject,
    mm: buoyDataObject,
    WVHT: buoyDataObject,
    SwH: buoyDataObject,
    SwP: buoyDataObject,
    WWH: buoyDataObject,
    WWP: buoyDataObject,
    SwD: buoyDataObject,
    WWD: buoyDataObject,
    STEEPNESS: buoyDataObject,
    APD: buoyDataObject,
    MWD: buoyDataObject,
  },
  activeDay: number,
  numDays: number,
  incrementDay: Function,
  decrementDay: Function,
}

const ForecastHeader = ({
  date,
  spotName,
  buoy,
  activeDay,
  incrementDay,
  decrementDay,
  numDays,
}: Props) => {
  const userTimezone = moment.tz.guess()
  const buoyTimeUTC = moment.utc(
    `${buoy['#YY'].data}/${buoy.MM.data}/${buoy.DD.data} ${buoy.hh.data}:${buoy.mm.data}`,
    'YYYY-MM-DD HH:mm'
  )

  const stickyElems = document.getElementsByClassName('day-sticky-container')
  Stickyfill.add(stickyElems)
  const buoyTimeLocal = moment.tz(buoyTimeUTC, userTimezone).format('L LT z')

  return [
    <div className="day-container" key="day-container">
      <div className="day-header">
        <div className="day-date-title full-width text-center">
          <h1 className="section-title spot-name">{spotName}</h1>
          <h2 className="section-subtitle forecast-date">{date}</h2>
        </div>
        <div className={`buoy-readings-container ${activeDay === 0 ? '' : 'hidden'}`}>
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
    </div>,
    <div className="day-sticky-container" key="day-stick-container">
      <button
        className="previous-day day-select-btn"
        disabled={!(activeDay > 0)}
        onClick={() => decrementDay(activeDay)}
      >
        Previous Day
      </button>
      <button
        className="next-day day-select-btn"
        disabled={!(activeDay < numDays - 1)}
        onClick={() => incrementDay(activeDay)}
      >
        Next Day
      </button>
    </div>
  ]
}

ForecastHeader.propTypes = {
  spotName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  buoy: PropTypes.shape({
    '#YY': PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
    MM: PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
    DD: PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
    hh: PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
    mm: PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
    WVHT: PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
    SwH: PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
    SwP: PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
    WWH: PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
    WWP: PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
    SwD: PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
    WWD: PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
    STEEPNESS: PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
    APD: PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
    MWD: PropTypes.shape({
      units: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  activeDay: PropTypes.number.isRequired,
  incrementDay: PropTypes.func.isRequired,
  decrementDay: PropTypes.func.isRequired,
  numDays: PropTypes.number.isRequired,
}

ForecastHeader.defaultProps = {}

export default ForecastHeader
