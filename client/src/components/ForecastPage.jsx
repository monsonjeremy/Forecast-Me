// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LoadingAnimation from './LoadingAnimation'
import GetStarted from './GetStarted'
import OpenSelectorButton from '../containers/OpenSelectorButton'
import WelcomeContainer from '../containers/WelcomeMessageContainer'
import ForecastPresentation from './ForecastPresentation'

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
    selectedRegion: Object,
    selectedSpot: Object,
    isSpot: boolean,
    activeDay: number,
    forecastFetched: boolean,
  },
}

class ForecastPage extends Component {
  constructor(props: Props) {
    super(props)

    this.getDataKeys = this.getDataKeys.bind(this)
    this.getCurrentSpotName = this.getCurrentSpotName.bind(this)
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

  getCurrentSpotName: Function

  getCurrentSpotName() {
    if (this.props.appState.isSpot) {
      return this.props.appState.selectedSpot.name
    }
    return this.props.appState.selectedRegion.name
  }

  renderForecast: Function

  renderForecast() {
    const props = {
      surf: this.props.appData.forecast.Surf,
      tide: this.props.appData.forecast.Tide,
      isSpot: this.props.appState.isSpot,
      dataKeys: this.getDataKeys(),
      activeDay: this.props.appState.activeDay,
      incrementDay: this.props.incrementDay,
      decrementDay: this.props.decrementDay,
      spotName: this.getCurrentSpotName(),
    }

    return <ForecastPresentation {...props} />
  }

  render() {
    return (
      <div>
        <WelcomeContainer />
        {!this.props.appData.forecastFetched && <GetStarted />}
        <OpenSelectorButton />
        {/* If the forecast is fetched and is not loading, render it */
          this.props.appData.forecastFetched &&
          !this.props.appData.forecastIsLoading &&
          this.renderForecast()}
        {/* If the forecast is loading, render loading animation */
          this.props.appData.forecastFetched &&
        this.props.appData.forecastIsLoading && <LoadingAnimation />}
      </div>
    )
  }
}

ForecastPage.propTypes = {
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
    selectedRegion: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    }),
    selectedSpot: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    }),
    isSpot: PropTypes.bool,
    activeDay: PropTypes.number,
    forecastFetched: PropTypes.bool,
  }).isRequired,
}

export default ForecastPage
