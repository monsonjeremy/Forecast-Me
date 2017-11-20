// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { roundToNearestTenth, convertCompassDegreesToCardinal } from '../helpers'

import '../stylesheets/SwellList.css'

type Props = {
  data: Array<{
    date: string,
    swellDirection1: Array<number>,
    swellDirection2: Array<number>,
    swellDirection3: Array<number>,
    swellPeriod1: Array<number>,
    swellPeriod2: Array<number>,
    swellPeriod3: Array<number>,
    swellHeight1: Array<number>,
    swellHeight2: Array<number>,
    swellHeight3: Array<number>,
  }>,
}

const SwellList = ({ data, }: Props) => {
  const swellReadings = data.map(d => {
    const swellReadingElems = []
    for (let i = 1; i <= 3; i += 1) {
      const swellHeight = roundToNearestTenth(d[`swellHeight${i}`])
      const swellDirection = roundToNearestTenth(d[`swellDirection${i}`])
      const swellPeriod = roundToNearestTenth(d[`swellPeriod${i}`])

      swellReadingElems.push(
        <h3 className="swell-info" key={`swell-number-${i}`}>
          {swellHeight}ft {swellDirection}&#176; {convertCompassDegreesToCardinal(swellDirection)} @{' '}
          {swellPeriod}s
        </h3>
      )
    }

    return (
      <div className="swell-container flex-col-centered" key={`${d.date}`}>
        <h2 className="swell-timestamp">
          {moment(d.date, 'MMMM DD, YYYY HH:mm:ss')
            .utc()
            .local()
            .format('hA')}
        </h2>
        {swellReadingElems}
      </div>
    )
  })

  return <div className="swell-forecast-container">{swellReadings}</div>
}

SwellList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      swellDirection1: PropTypes.number.isRequired,
      swellDirection2: PropTypes.number.isRequired,
      swellDirection3: PropTypes.number.isRequired,
      swellPeriod1: PropTypes.number.isRequired,
      swellPeriod2: PropTypes.number.isRequired,
      swellPeriod3: PropTypes.number.isRequired,
      swellHeight1: PropTypes.number.isRequired,
      swellHeight2: PropTypes.number.isRequired,
      swellHeight3: PropTypes.number.isRequired,
    })
  ).isRequired,
}

SwellList.defaultProps = {}

export default SwellList
