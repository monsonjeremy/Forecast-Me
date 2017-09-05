/* @flow */

import React from 'react'
import ArrowButton from './ArrowButton'
import helpers from '../helpers/helperFunctions'
import DayContainer from './DayContainer'

import '../stylesheets/ForecastPresentation.css'

type Props = {
  surf: Object,
  tide: Object,
  isSpot: boolean,
  dataKeys: Array<string>,
  activeDay: number,
  incrementDay: Function,
  decrementDay: Function,
}
/*
Simple stateless functional componentthat renders the navbar in the top level of the app so
that it is present in every section of the app.
It is connected to react-router, since that's what we use for routing.
*/
const ForecastPresentation = ({
  surf,
  tide,
  isSpot,
  dataKeys,
  activeDay,
  incrementDay,
  decrementDay,
}: Props) => {
  const date = surf.dateStamp[activeDay]
  const numDays = surf.dateStamp.length
  const forecast = helpers.formatSurflineData(date, surf, activeDay, isSpot)
  const maxSurf = helpers.roundUpMaxSurfHeight(surf.surf_max_maximum) + 3

  const forecastProps = {
    date,
    forecast,
    maxSurf,
    tide: tide.dataPoints,
    numDays,
    dataKeys,
  }
  return (
    <div className="forecast-container container">
      <div className="forecast-box">
        <div className={'arrow-wrapper'}>
          <ArrowButton
            orientation={'left'}
            disabled={!(activeDay > 0)}
            onClick={() => decrementDay(activeDay)}
          />
        </div>
        <div className="forecast">
          <DayContainer {...forecastProps} />
        </div>
        <div className={'arrow-wrapper'}>
          <ArrowButton
            disabled={!(activeDay < numDays - 1)}
            orientation={'right'}
            onClick={() => incrementDay(activeDay)}
          />
        </div>
      </div>
    </div>
  )
}

export default ForecastPresentation
