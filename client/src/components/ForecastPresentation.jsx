/* @flow */

import React, { PureComponent } from 'react'
import moment from 'moment'
import ArrowButton from './ArrowButton'
import { formatSurflineData, roundUpMaxSurfHeight, prepTideData } from '../helpers/helperFunctions'
// import DataInterpolationWrapper from '../containers/DataInterpolationWrapper'
import { DayContainer, AnimatedDataGraphContainer } from './'

import '../stylesheets/ForecastPresentation.css'

type Props = {
  surf: Object,
  tide: Object,
  isSpot: boolean,
  dataKeys: Array<string>,
  activeDay: number,
  incrementDay: Function,
  decrementDay: Function,
  spotName: string,
}

/*
Simple stateless functional componentthat renders the navbar in the top level of the app so
that it is present in every section of the app.
It is connected to react-router, since that's what we use for routing.
*/
class ForecastPresentation extends PureComponent<Props> {
  render() {
    const {
      surf,
      activeDay,
      isSpot,
      tide,
      dataKeys,
      spotName,
      decrementDay,
      incrementDay,
    } = this.props

    const dayDateArray = surf.dateStamp[this.props.activeDay]
    const date = moment(dayDateArray, 'MMMM DD, YYYY HH:mm:ss').format('ddd MMMM Do')

    const numDays = surf.dateStamp.length
    const forecast = formatSurflineData(dayDateArray, surf, activeDay, isSpot)
    const maxSurf = roundUpMaxSurfHeight(surf.surf_max_maximum)

    const formattedTideData = prepTideData(date, tide.dataPoints, 500)

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

    const forecastProps = {
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
      <div className="forecast-container">
        <div className="forecast-box">
          <div className="forecast">
            <DayContainer date={dayDateArray} spotName={spotName}>
              <div className="arrow-wrapper">
                <ArrowButton
                  orientation={'left'}
                  disabled={!(activeDay > 0)}
                  onClick={() => decrementDay(activeDay)}
                />
              </div>
              <AnimatedDataGraphContainer {...forecastProps} />
              <div className="arrow-wrapper">
                <ArrowButton
                  disabled={!(activeDay < numDays - 1)}
                  orientation={'right'}
                  onClick={() => incrementDay(activeDay)}
                />
              </div>
            </DayContainer>
          </div>
        </div>
      </div>
    )
  }
}

export default ForecastPresentation
