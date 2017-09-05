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
}

// Add the wrapper for the animated graph container
const AnimatedDataGraphContainer = DataInterpolationWrapper()(GraphContainer)

const DayContainer = ({ date, forecast, maxSurf, dataKeys, tide, }: Props) => {
  // Format the date in the Title section of the container ('Wed June 21st')
  const dateTitle = moment(date[0], 'MMMM DD, YYYY HH:mm:ss').format('ddd MMMM Do')
  const formattedTideData = helpers.prepTideData(dateTitle, tide, 500)

  // Tide graph props
  const size = [350, 150]
  const margins = [15, 15, 15, 15]
  const vwidth = size[0] - margins[1] - margins[3]
  const vheight = size[1] - margins[0] - margins[2]
  const view = [vwidth, vheight]

  const props = {
    dataSets: {
      surf: {
        data: forecast,
        keysToInterp: dataKeys,
        keys: dataKeys,
        width: 500,
        height: 500,
        axisMargin: 83,
        topMargin: 10,
        bottomMargin: 5,
        yMax: maxSurf,
      },
      tide: {
        data: formattedTideData,
        mountInterpKeys: ['lineChartCurtain'],
        keysToInterp: ['height'],
        view,
        size,
        margins,
      },
    },
  }

  return (
    <div className="day-container">
      <div className="day-date-title full-width text-center">
        <h2>{dateTitle}</h2>
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
