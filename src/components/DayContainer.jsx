// @flow

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import GraphContainer from './GraphContainer'
import helpers from '../helpers/helperFunctions'
import '../stylesheets/daycontainer.css'

type Props = {
  date: Array<String>,
  forecast: Array<Object>,
  maxSurf: number,
  dataKeys: Array<String>,
  tide: Array<Object>,
}

const DayContainer = ({ date, forecast, maxSurf, dataKeys, tide, }: Props) => {
  // Format the date in the Title section of the container ('Wed June 21st')
  const dateTitle = moment(date[0], 'MMMM DD, YYYY HH:mm:ss').format('ddd MMMM Do')
  const formattedTideData = helpers.filterTideData(dateTitle, tide)

  // This could maybe be moved to a different component
  // Keeping it here until other graphs are finished in case graphs within the same day container
  // need to know each others information
  const params = {
    data: forecast,
    tide: formattedTideData,
    width: 300,
    height: 500,
    axisMargin: 83,
    topMargin: 10,
    bottomMargin: 5,
    yMax: maxSurf,
    keys: dataKeys,
  }

  return (
    <div className="days row">
      <div className="day-date-title col-xs-12 col-md-12 text-center">
        <h2>
          {dateTitle}
        </h2>
        <hr className="style-two" />
      </div>
      <br />
      <div className="cols-xs-12 col-md-12 text-center">
        <GraphContainer {...params} />
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
