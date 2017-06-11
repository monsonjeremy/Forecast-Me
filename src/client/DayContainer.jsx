// @flow

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import StackedBarChart from './components/stacked_bar_chart/StackedBarChart'
import { formatSurflineData, roundUpMaxSurfHeight /* filterTideData */ } from '../shared/dataManipulation'

type Props = {
  date: Array<string>,
  forecast: Object,
  forecastDay: number,
  isSpot: boolean,
}

const DayContainer = ({ date, forecast, forecastDay, isSpot }: Props) => {
  const forecastSurfData = formatSurflineData(date, forecast.Surf, forecastDay, isSpot)
  const surfChartWidth = '85%'

  const dateTitle = moment(date[0]).format('ddd MMMM Do')
  // const tideData = filterTideData(dateTitle, forecast.Tide.dataPoints)
  const tideChartWidth = '85%'

  // let topBarDataKey = 'aggSurfMax'
  // let bottomBarDataKey = 'aggSurfMin'

  /* if (isSpot) {
    topBarDataKey = 'surfMax'
    bottomBarDataKey = 'surfMin'
  }*/

  const params = {
    width: 500,
    height: 500,
    axisMargin: 83,
    topMargin: 10,
    bottomMargin: 5,
    yMax: roundUpMaxSurfHeight(forecast.surf_max_maximum) + 3,
    keys: ['aggSurfMin', 'aggSurfMax'],
  }

  const fullWidth = 700

  return (
    <div className="days row">
      <div className="day-date-title col-xs-12 col-md-12 text-center">
        <h2>{dateTitle}</h2>
        <hr className="style-two" />
      </div>
      <br />
      <div className="cols-xs-12 col-md-12 text-center">
        <div className="charts-wrapper row">
          <div className="surf-forecast-day col-xs-12 col-md-4 text-center">
            <div className="surf-forecast-title" style={{ width: surfChartWidth, margin: 'auto' }}>
              <h3>SURF</h3>
            </div>
            <div>
              <svg width={fullWidth} height={params.height}>
                <StackedBarChart {...params} data={forecastSurfData} />
              </svg>
            </div>
          </div>
          <div className="tide-forecast-day col-xs-12 col-md-8 text-center">
            <div className="tide-forecast-title" style={{ width: tideChartWidth, margin: 'auto' }}>
              <h3>TIDE</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

DayContainer.propTypes = {
  date: PropTypes.instanceOf(Array).isRequired,
  forecast: PropTypes.instanceOf(Object).isRequired,
  forecastDay: PropTypes.number.isRequired,
  isSpot: PropTypes.bool.isRequired,
}

export default DayContainer
