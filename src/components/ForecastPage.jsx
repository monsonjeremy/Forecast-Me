// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DayContainer from './DayContainer'
import helpers from '../helpers/helperFunctions'
import LoadingAnimation from './LoadingAnimation'
import ArrowButton from './ArrowButton'
import GetStarted from './GetStarted'
import OpenSelectorButton from '../containers/OpenSelectorButton'
import AnimatedDataWrapper from '../containers/AnimatedDataWrapper'
import WelcomeContainer from '../containers/WelcomeMessageContainer'

const AnimatedDayContainer = AnimatedDataWrapper('forecast')(DayContainer)

type Props = {
  incrementDay: Function,
  decrementDay: Function,
  appData: {
    forecast: {
      Surf: Object,
      Tide: Object,
    },
    forecastFetched: boolean,
    forecastIsLoading: boolean,
  },
  appState: {
    isSpot: boolean,
    activeDay: number,
    forecastFetched: boolean,
  },
}

class ForecastPage extends Component {
  constructor(props: Props) {
    super(props)

    this.getDataKeys = this.getDataKeys.bind(this)
    this.renderForecast = this.renderForecast.bind(this)
  }

  getDataKeys: Function

  getDataKeys() {
    let topBarDataKey = 'aggSurfMax'
    let bottomBarDataKey = 'aggSurfMin'

    if (this.props.appState.isSpot) {
      topBarDataKey = 'surfMax'
      bottomBarDataKey = 'surfMin'
    }

    return [bottomBarDataKey, topBarDataKey]
  }

  renderForecast: Function

  renderForecast() {
    const rawSurfData = this.props.appData.forecast.Surf
    const dayForecastDateStrings = rawSurfData.dateStamp[this.props.appState.activeDay]
    const forecastDay = this.props.appState.activeDay
    const formattedSurfData = helpers.formatSurflineData(
      dayForecastDateStrings,
      rawSurfData,
      forecastDay,
      this.props.appState.isSpot
    )

    const props = {
      date: dayForecastDateStrings,
      forecast: formattedSurfData,
      maxSurf: helpers.roundUpMaxSurfHeight(rawSurfData.surf_max_maximum) + 3,
      dataKeys: this.getDataKeys(),
      tide: this.props.appData.forecast.Tide.dataPoints,
    }

    return (
      <div className="forecast-box container-fluid">
        <div className="row is-flex">
          <div className="col-s-12 col-md-1 arrowdiv textcenter">
            {this.props.appState.activeDay > 0
              ? <ArrowButton
                orientation={'left'}
                onClick={() => this.props.decrementDay(this.props.appState.activeDay)}
              />
              : <div className="previous_btn" title="Previous" />}
          </div>
          <div className="col-s-12 col-md-10">
            <AnimatedDayContainer {...props} />
          </div>
          <div className="col-s-12 col-md-1 arrowdiv textcenter">
            {this.props.appState.activeDay < rawSurfData.dateStamp.length - 1
              ? <ArrowButton
                orientation={'right'}
                onClick={() => this.props.incrementDay(this.props.appState.activeDay)}
              />
              : <div className="next_btn" title="Next" />}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <WelcomeContainer />
        <GetStarted />
        <OpenSelectorButton />
        {/* If the forecast is fetched and is not loading, render it */
          this.props.appData.forecastFetched &&
          !this.props.appData.forecastIsLoading &&
          this.renderForecast()}
        {/* If the forecast is loading, render loading animation */
          this.props.appData.forecastIsLoading && <LoadingAnimation />}
      </div>
    )
  }
}

ForecastPage.propTypes = {
  // fetchSpot: PropTypes.func.isRequired,
  // fetchRegion: PropTypes.func.isRequired,
  incrementDay: PropTypes.func.isRequired,
  decrementDay: PropTypes.func.isRequired,
  appData: PropTypes.shape({
    forecast: PropTypes.shape({
      Surf: PropTypes.instanceOf(Object),
      Tide: PropTypes.instanceOf(Object),
    }),
    forecastFetched: PropTypes.bool,
    forecastIsLoading: PropTypes.bool,
  }).isRequired,
  appState: PropTypes.shape({
    isSpot: PropTypes.bool,
    activeDay: PropTypes.number,
    forecastFetched: PropTypes.bool,
  }).isRequired,
}

export default ForecastPage
