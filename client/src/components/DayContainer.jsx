// @flow

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import GraphContainer from './GraphContainer'
import DataInterpolationWrapper from '../containers/DataInterpolationWrapper'
import helpers from '../helpers/helperFunctions'
import '../stylesheets/DayContainer.css'

type Props = {
  date: Array<string>,
  forecast: Array<Object>,
  maxSurf: number,
  dataKeys: Array<string>,
  tide: Array<Object>,
  spotName: string,
}

// Add the wrapper for the animated graph container
const AnimatedDataGraphContainer = DataInterpolationWrapper()(GraphContainer)

const DayContainer = ({ date, forecast, maxSurf, dataKeys, tide, spotName, }: Props) => {
  // Format the date in the Title section of the container ('Wed June 21st')
  const dateTitle = moment(date[0], 'MMMM DD, YYYY HH:mm:ss').format('ddd MMMM Do')
  const formattedTideData = helpers.prepTideData(dateTitle, tide, 500)

  // Margins for the axes of the graphs
  const margins = [15, 15, 15, 15]

  // Tide graph props
  const surfSize = [100, 70]
  const surfVWidth = surfSize[0] - margins[1] - margins[3]
  const surfVHeight = surfSize[1] - margins[0] - margins[2]
  const surfView = [surfVWidth, surfVHeight]

  // Tide graph props
  const tideSize = [500, 200]
  const tideVWidth = tideSize[0] - margins[1] - margins[3]
  const tideVHeight = tideSize[1] - margins[0] - margins[2]
  const tideView = [tideVWidth, tideVHeight]

  const props = {
    dataSets: {
      surf: {
        data: forecast,
        view: surfView,
        size: surfSize,
        margins,
        keysToInterp: dataKeys,
        keys: dataKeys,
        yMax: maxSurf,
      },
      tide: {
        data: formattedTideData,
        mountInterpKeys: ['lineChartCurtain'],
        keysToInterp: ['height'],
        view: tideView,
        size: tideSize,
        margins,
      },
    },
  }

  return (
    <div className="day-container">
      <div className="day-date-title full-width text-center">
        <h1 className="section-title spot-name">{spotName}</h1>
        <h2 className="section-subtitle forecast-date">{dateTitle}</h2>
        <hr className="style-two" />
      </div>
      <br />
      <div className="text-center full-width">
        <AnimatedDataGraphContainer {...props} />
      </div>
    </div>
  )
}

DayContainer.propTypes = {
  spotName: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Array).isRequired,
  forecast: PropTypes.arrayOf(Object).isRequired,
  maxSurf: PropTypes.number.isRequired,
  dataKeys: PropTypes.instanceOf(Array).isRequired,
  tide: PropTypes.arrayOf(
    PropTypes.shape({
      Localtime: PropTypes.string.isRequired,
      Rawtime: PropTypes.string.isRequired,
      height: PropTypes.number.isRequired,
      time: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      utctime: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default DayContainer
