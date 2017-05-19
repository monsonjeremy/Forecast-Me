// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { VictoryBar, VictoryChart, VictoryStack, VictoryAxis } from 'victory'
import { formatSurflineData } from '../shared/api'

type Props = {
  date: Array<string>,
  forecast: Object,
  forecastDay: number,
  isSpot: boolean,
}

const createTimeStringArray = (dateTimes) => {
  const timeStrings = []
  // flow-disable-next-line
  dateTimes.map(date => timeStrings.push(new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })))
  return timeStrings
}

const DayContainer = ({ date, forecast, forecastDay, isSpot }: Props) => {
  const forecastdata = formatSurflineData(date, forecast, forecastDay, isSpot)
  const axisTimes = createTimeStringArray(date)

  return (
    <div className={'forecast-by-day'}>
      <VictoryChart
        width={300}
        height={250}
        domainPadding={20}
      >
        <VictoryAxis
          tickValues={[5, 11, 17, 23]}
          tickFormat={axisTimes}
        />
        <VictoryStack>
          <VictoryBar
            data={forecastdata}
            x={datum => new Date(datum.dateTime).getHours()}
            y={datum => datum.aggSurfMin}
            labels={datum => datum.aggSurfMin}
            animate={{ duration: 2000,
              onLoad: { duration: 1000 },
              onEnter: { duration: 500, before: () => ({ y: 0 }) } }}
          />
          <VictoryBar
            data={forecastdata}
            x={datum => new Date(datum.dateTime).getHours()}
            y={datum => datum.aggSurfMax - datum.aggSurfMin}
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
  isSpot: PropTypes.bool.isRequired,
}

export default DayContainer
