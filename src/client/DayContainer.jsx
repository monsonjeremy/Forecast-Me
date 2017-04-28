// @flow

import React from 'react'
import PropTypes from 'prop-types'

type Props = {
  date: Array<string>,
}


const DayContainer = ({ date }: Props) =>
  <div className="forecast-by-day">
    {date.map((day: string) =>
        day,
    )}
  </div>

DayContainer.propTypes = {
  date: PropTypes.instanceOf(Array).isRequired,
}

export default DayContainer
