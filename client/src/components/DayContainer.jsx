// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import '../stylesheets/DayContainer.css'

type Props = {
  date: Array<string>,
  children?: React.Node,
  spotName: string,
}

const DayContainer = ({ date, spotName, children, }: Props) => {
  // Format the date in the Title section of the container ('Wed June 21st')
  const dateTitle = moment(date[0], 'MMMM DD, YYYY HH:mm:ss').format('ddd MMMM Do')

  return (
    <div className="day-container">
      <div className="day-header">
        <div className="day-date-title full-width text-center">
          <h1 className="section-title spot-name">{spotName}</h1>
          <h2 className="section-subtitle forecast-date">{dateTitle}</h2>
        </div>
      </div>
      <br />
      <div className="day-graphs text-center full-width">{children}</div>
    </div>
  )
}

DayContainer.propTypes = {
  spotName: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

DayContainer.defaultProps = {
  children: null,
}

export default DayContainer
