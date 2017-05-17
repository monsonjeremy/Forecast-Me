// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { VictoryBar, VictoryChart, VictoryStack } from 'victory'
import { formatSurflineData } from '../shared/api'

type Props = {
  date: Array<string>,
  forecast: Object,
  forecastDay: number,
}

const DayContainer = ({ date, forecast, forecastDay }: Props) => {
  const forecastdata = formatSurflineData(date, forecast, forecastDay)

  return (
    <div className={'forecast-by-day'}>
      <VictoryChart>
        <VictoryStack>
          <VictoryBar
            data={forecastdata}
            x={datum => new Date(datum.dateTime).getHours()}
            y={datum => datum.aggSurfMin}
            padding={10}
            domainpadding={[5, 0]}
            labels={datum => datum.aggSurfMin}
            animate={{ duration: 2000,
              onLoad: { duration: 1000 },
              onEnter: { duration: 500, before: () => ({ y: 0 }) } }}
          />
          <VictoryBar
            data={forecastdata}
            x={datum => new Date(datum.dateTime).getHours()}
            y={datum => datum.aggSurfMax - datum.aggSurfMin}
            domainpadding={[5, 0]}
            labels={datum => datum.aggSurfMax}
            animate={{ duration: 2000,
              onLoad: { duration: 1000 },
              onEnter: { duration: 500, before: () => ({ y: 0 }) } }}
          />
        </VictoryStack>
      </VictoryChart>
    </div>
  )
}

DayContainer.propTypes = {
  date: PropTypes.instanceOf(Array).isRequired,
  forecast: PropTypes.instanceOf(Object).isRequired,
  forecastDay: PropTypes.number.isRequired,
}

export default DayContainer
