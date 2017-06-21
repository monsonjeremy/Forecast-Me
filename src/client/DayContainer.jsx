// @flow

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import StackedBarChart from './components/stacked_bar_chart/StackedBarChart'
import '../assets/stylesheets/daycontainer.scss'

type Props = {
  date: Array<string>,
  forecast: Object,
  maxSurf: number,
  dataKeys: Array<string>,
}

const DayContainer = ({ date, forecast, maxSurf, dataKeys }: Props) => {
  const surfChartWidth = '85%'

  const dateTitle = moment(date[0], 'MMMM DD, YYYY HH:mm:ss').format('ddd MMMM Do')
  // const tideData = filterTideData(dateTitle, forecast.Tide.dataPoints)
  const tideChartWidth = '85%'

  const params = {
    width: 300,
    height: 500,
    axisMargin: 83,
    topMargin: 10,
    bottomMargin: 5,
    yMax: maxSurf,
    keys: dataKeys,
  }

  const fullWidth = 500

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
            {/* TODO: Remove these style tags and move to Sass */}
            <div className="surf-forecast-title" style={{ width: surfChartWidth, margin: 'auto' }}>
              <h3>SURF</h3>
            </div>
            <div>
              <svg
                width={'100%'}
                height={'100%'}
                viewBox={`-100 150 ${fullWidth} ${params.height}`}
              >
                <StackedBarChart {...params} data={forecast} />
              </svg>
            </div>
          </div>
          <div className="tide-forecast-day col-xs-12 col-md-8 text-center">
            {/* TODO: Remove these style tags and move to Sass */}
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
  maxSurf: PropTypes.number.isRequired,
  dataKeys: PropTypes.instanceOf(Array).isRequired,
}

export default DayContainer
