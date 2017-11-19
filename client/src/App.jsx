// @flow

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import ForecastPageContainer from './containers/ForecastPageContainer'
import { ErrorBoundary, About, SideNav } from './components'
import { fetchSpot as fetchSpotAPI, getBuoyData, getRegions, setVisitedCookie } from './helpers'
import {
  fetchForecast,
  fetchSpotList,
  setForecast,
  setSpotList,
  setRegion,
  setSpot,
  viewedWelcomeMessage
} from './actions'

type Props = {
  fetchSpot: Function,
  fetchRegion: Function,
  fetchSpotList: Function,
  setSpotWithRegion: Function,
  appState: {
    selectedRegion: {
      name: string,
      id: string,
    },
    selectedSpot: {
      name: string,
      id: string,
    },
  },
  appData: {
    spotList: Array<{
      region: {
        id: string,
        name: string,
        buoy: {
          buoyId: string,
          buoyName: string,
        },
        spots: Array<{
          id: string,
          name: string,
        }>,
      },
    }>,
    spotListIsLoading: boolean,
  },
}
class App extends PureComponent<Props> {
  constructor(props) {
    super(props)
    this.renderSideNav = this.renderSideNav.bind(this)
  }

  renderSideNav = () => {
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

    return <SideNav className="side-nav" key="sidenav" {...sideNavProps} />
  }
  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          {this.renderSideNav()}
          <div className="page-container" key="page-container">
            <Switch>
              <Route exact path="/" component={ForecastPageContainer} />
              <Route path="/forecast" component={ForecastPageContainer} />
              <Route path="/info" component={About} />
            </Switch>
          </div>
        </div>
      </ErrorBoundary>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
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

App.propTypes = {
  fetchSpot: PropTypes.func.isRequired,
  fetchRegion: PropTypes.func.isRequired,
  fetchSpotList: PropTypes.func.isRequired,
  setSpotWithRegion: PropTypes.func.isRequired,
  appState: PropTypes.shape({
    selectedRegion: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    }),
    selectedSpot: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    }),
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
    spotListIsLoading: PropTypes.bool,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
