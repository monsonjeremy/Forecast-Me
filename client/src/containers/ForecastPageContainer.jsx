import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { action as toggleSelector } from 'redux-burger-menu'

import { ForecastPage, SideNav, DropdownSelector } from '../components'
import { fetchSpot as fetchSpotAPI, newAPI, getBuoyData } from '../helpers/api'
import { getCookie, setCookie } from '../helpers/helperFunctions'

import { fetchForecast, setForecast, resetAppData } from '../actions/data'
import {
  resetAppState,
  setRegion,
  setSpot,
  incrementDay,
  decrementDay,
  viewedWelcomeMessage
} from '../actions/appState'

const regions = [
  {
    name: 'Santa Cruz',
    id: '2958',
    buoy: {
      buoyId: '46012',
      buoyName: 'Monterey Bay',
    },
    spots: [
      { name: 'Steamer Lane', id: '4188', },
      { name: 'Four Mile', id: '5023', },
      { name: 'Waddell Creek', id: '5021', },
      { name: "Mitchell's Cove", id: '5028', },
      { name: '26th Ave', id: '5030', },
      { name: 'Scott Creek', id: '5022', },
      { name: 'Davenport', id: '5024', },
      { name: 'Natural Bridges', id: '5028', },
      { name: 'Cowells', id: '4189', },
      { name: 'The Harbor', id: '5031', },
      { name: 'Pleasure Point', id: '4190', },
      { name: '38th Ave', id: '4191', },
      { name: 'Capitola', id: '10763', },
      { name: 'Manresa', id: '5036', },
      { name: 'The Hook', id: '108024', }
    ],
  },
  {
    name: 'North Orange Country',
    id: '2143',
    buoy: {
      buoyId: '46012',
      buoyName: 'Monterey Bay',
    },
    spots: [{ name: 'Newport', id: '1241', }, { name: 'HB', id: '3421', }],
  }
]

class ForecastPageContainer extends Component {
  constructor(props) {
    super(props)

    this.regions = regions
    this.renderForecastPage = this.renderForecastPage.bind(this)
  }

  componentWillMount() {
    newAPI().then(data => console.log(data))
  }

  componentDidMount() {
    // Set a cookie if a user visits the site
    const hasVisited = getCookie('has-visited')
    if (hasVisited !== 'true') {
      setCookie('has-visited', 'true', 365)
    }
  }

  renderForecastPage() {
    const renderWelcomeMessage = getCookie('has-visited') !== 'true'
    const selectedRegion = this.props.appState.selectedRegion

    const regionDropdownProps = {
      options: this.regions,
      title: 'Region Selector',
      type: 'region',
      itemClick: this.props.fetchRegion,
    }

    let spotOptions = null

    if (selectedRegion !== null) {
      spotOptions = selectedRegion.spots
    }

    const spotDropdownProps = {
      isDisabled: selectedRegion === null,
      title: 'Spot Selector',
      type: 'spot',
      itemClick: this.props.fetchSpot,
      options: spotOptions,
    }

    return [
      <SideNav
        key="side-nav-forecast-page"
        regions={regions}
        setSpot={this.props.fetchSpot}
        setSpotWithRegion={this.props.setSpotWithRegion}
        setRegion={this.props.fetchRegion}
      >
        <DropdownSelector key={'region-dropdown'} {...regionDropdownProps} />
        <DropdownSelector key={'spot-dropdown'} {...spotDropdownProps} />
      </SideNav>,
      <ForecastPage key="forecast-page" {...{ ...this.props, renderWelcomeMessage, }} />
    ]
  }

  render() {
    return this.renderForecastPage()
  }
}

ForecastPageContainer.propTypes = {
  fetchSpot: PropTypes.func.isRequired,
  fetchRegion: PropTypes.func.isRequired,
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
    isSpot: PropTypes.bool,
    activeDay: PropTypes.number,
    forecastFetched: PropTypes.bool,
  }).isRequired,
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  resetAppState: () => dispatch(resetAppState()),
  incrementDay: activeDay => dispatch(incrementDay(activeDay)),
  decrementDay: activeDay => dispatch(decrementDay(activeDay)),
  toggleSelector: () => dispatch(toggleSelector(true)),
  closeClick: () => dispatch(viewedWelcomeMessage()),
  fetchRegion: async region => {
    // User interacted with page, no need to show welcome message again
    dispatch(viewedWelcomeMessage())
    // Reset the App State since selecting a new region changes the spots available
    dispatch(resetAppState())
    // Reset the app data so that the flag "forecastFetched" is back to false
    dispatch(resetAppData())
    // Dispatch an action to update the selected region
    dispatch(setRegion(region))
    dispatch(fetchForecast())

    // Get the forecast for the region and its buoy then add buoy data to region forecast
    const regionForecast = await fetchSpotAPI(region.id)

    dispatch(setForecast(regionForecast.data, false))
  },
  setSpotWithRegion: async (region, spot) => {
    // User interacted with page, no need to show welcome message again
    dispatch(viewedWelcomeMessage())
    // Reset the App State since selecting a new region changes the spots available
    dispatch(resetAppState())
    // Reset the app data so that the flag "forecastFetched" is back to false
    dispatch(resetAppData())
    // Dispatch an action to update the selected spot
    dispatch(setRegion(region))
    dispatch(setSpot(spot))
    dispatch(fetchForecast())

    // Get the forecast for the spot and its buoy then add buoy data to region forecast
    const spotForecast = await fetchSpotAPI(spot.id)

    dispatch(setForecast(spotForecast.data, false))
  },
  fetchSpot: spot => {
    // Reset the app data so that the flag "forecastFetched" is back to false
    dispatch(resetAppData())
    // Dispatch an action to update the selected spot
    dispatch(setSpot(spot))
    dispatch(fetchForecast())
    // Dispatch a Thunk to fetch the response of the API call and update the QA analysis
    return fetchSpotAPI(spot.id).then(response => {
      dispatch(setForecast(response.data, false))
    })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ForecastPageContainer)
