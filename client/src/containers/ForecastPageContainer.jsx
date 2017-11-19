import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { WelcomeContainer } from './'
import { SideNav, ForecastPagePresentation, Loader, GetStarted } from '../components'
import {
  fetchSpot as fetchSpotAPI,
  getBuoyData,
  getRegions,
  getCookie,
  setVisitedCookie
} from '../helpers'
import {
  fetchForecast,
  fetchSpotList,
  setForecast,
  setSpotList,
  setRegion,
  setSpot,
  incrementDay,
  decrementDay,
  viewedWelcomeMessage
} from '../actions'

class ForecastPageContainer extends Component {
  constructor(props) {
    super(props)

    this.renderForecast = this.renderForecast.bind(this)
    this.renderGetStarted = this.renderGetStarted.bind(this)
    this.renderLoader = this.renderLoader.bind(this)
    this.renderWelcomeMessage = this.renderWelcomeMessage.bind(this)
    this.renderSideNav = this.renderSideNav.bind(this)
  }

  renderForecast() {
    const forecastIsLoaded = this.props.appData.forecast && !this.props.appData.forecastIsLoading
    if (forecastIsLoaded) {
      const dataKeys = ['surfMin', 'surfMax']
      let spotName = ''

      if (this.props.appState.isSpot) {
        spotName = this.props.appState.selectedSpot.name
      }
      spotName = this.props.appState.selectedRegion.name

      const props = {
        surf: this.props.appData.forecast.Surf,
        tide: this.props.appData.forecast.Tide,
        wind: this.props.appData.forecast.Wind,
        tideMin: this.props.appData.forecast.tideMin,
        tideMax: this.props.appData.forecast.tideMax,
        sun: this.props.appData.forecast.Sun,
        buoy: this.props.appData.forecast.Buoy,
        isSpot: this.props.appState.isSpot,
        activeDay: this.props.appState.activeDay,
        incrementDay: this.props.incrementDay,
        decrementDay: this.props.decrementDay,
        appState: this.props.appState,
        spotName,
        dataKeys,
      }

      return <ForecastPagePresentation {...props} />
    }
    return null
  }

  renderLoader() {
    const forecastIsLoading =
      this.props.appData.forecastFetched && this.props.appData.forecastIsLoading
    if (forecastIsLoading) {
      return <Loader />
    }
    return null
  }

  renderGetStarted() {
    const showLandingPage = !this.props.appData.forecastFetched

    if (showLandingPage) {
      return <GetStarted />
    }
    return null
  }

  renderWelcomeMessage() {
    const renderWelcomeMessage =
      getCookie('has-visited') !== 'true' && this.props.appState.showWelcomeMessage

    return <WelcomeContainer renderWelcomeMessage={renderWelcomeMessage} />
  }

  renderSideNav() {
    const sideNavProps = {
      regions: this.props.appData.spotList,
      spotListIsLoading: this.props.appData.spotListIsLoading,
      setSpot: this.props.fetchSpot,
      setSpotWithRegion: this.props.setSpotWithRegion,
      setRegion: this.props.fetchRegion,
      fetchSpotList: this.props.fetchSpotList,
      selectedRegion: this.props.appState.selectedRegion,
      selectedSpot: this.props.appState.selectedRegion,
      spotList: this.props.appData.spotList,
    }
    return <SideNav key="forecast-page-sidenav" {...sideNavProps} />
  }

  render() {
    return [
      this.renderSideNav(),
      <div className="page-container" key="forecast-page-container">
        {this.renderLoader()}
        {this.renderWelcomeMessage()}
        {this.renderGetStarted()}
        {this.renderForecast()}
      </div>
    ]
  }
}

ForecastPageContainer.propTypes = {
  fetchSpot: PropTypes.func.isRequired,
  fetchRegion: PropTypes.func.isRequired,
  fetchSpotList: PropTypes.func.isRequired,
  incrementDay: PropTypes.func.isRequired,
  decrementDay: PropTypes.func.isRequired,
  setSpotWithRegion: PropTypes.func.isRequired,
  appState: PropTypes.shape({
    showWelcomeMessage: PropTypes.bool.isRequired,
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
  appData: PropTypes.shape({
    spotList: PropTypes.arrayOf(
      PropTypes.shape({
        region: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          buoy: PropTypes.shape({
            buoyId: PropTypes.string.isRequired,
            buoyName: PropTypes.string.isRequired,
          }),
          spots: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
            }).isRequired
          ).isRequired,
        }),
      })
    ),
    forecast: PropTypes.shape({
      Surf: PropTypes.instanceOf(Object),
      Tide: PropTypes.instanceOf(Object),
      Wind: PropTypes.instanceOf(Object),
      Buoy: PropTypes.instanceOf(Object),
      Sun: PropTypes.instanceOf(Object),
      tideMin: PropTypes.number.isRequired,
      tideMax: PropTypes.number.isRequired,
    }),
    forecastFetched: PropTypes.bool,
    forecastIsLoading: PropTypes.bool,
    spotListIsLoading: PropTypes.bool,
  }).isRequired,
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  incrementDay: activeDay => dispatch(incrementDay(activeDay)),
  decrementDay: activeDay => dispatch(decrementDay(activeDay)),
  fetchSpotList: async () => {
    // Dispatch an action to set the loader state
    dispatch(fetchSpotList())
    // Hit that API
    const spotList = await getRegions()
    dispatch(setSpotList(spotList))
  },
  fetchRegion: async region => {
    // User interacted with page, no need to show welcome message again
    dispatch(viewedWelcomeMessage())
    setVisitedCookie()
    // Dispatch an action to update the selected region
    dispatch(setRegion(region))
    dispatch(fetchForecast())

    // Get the forecast for the region and its buoy then add buoy data to region forecast
    const regionForecast = await fetchSpotAPI(region.id)
    const buoyData = await getBuoyData(region.buoy.buoyId)
    regionForecast.data.Buoy = buoyData.data

    dispatch(setForecast(regionForecast.data, false))
    // dispatch(forecastLoaded())
  },
  setSpotWithRegion: async (region, spot) => {
    // User interacted with page, no need to show welcome message again
    dispatch(viewedWelcomeMessage())
    setVisitedCookie()
    // Dispatch an action to update the selected spot
    dispatch(setRegion(region))
    dispatch(setSpot(spot))
    dispatch(fetchForecast())

    // Get the forecast for the spot and its buoy then add buoy data to region forecast
    const spotForecast = await fetchSpotAPI(spot.id)
    const buoyData = await getBuoyData(region.buoy.buoyId)
    spotForecast.data.Buoy = buoyData.data

    dispatch(setForecast(spotForecast.data, false))
  },
  fetchSpot: async (spot, region) => {
    // Dispatch an action to update the selected spot
    dispatch(setSpot(spot))
    dispatch(fetchForecast())
    // Dispatch a Thunk to fetch the response of the API call and update the QA analysis
    const spotForecast = await fetchSpotAPI(spot.id)
    const buoyData = await getBuoyData(region.buoy.buoyId)
    spotForecast.data.Buoy = buoyData.data

    dispatch(setForecast(spotForecast.data, false))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ForecastPageContainer)
