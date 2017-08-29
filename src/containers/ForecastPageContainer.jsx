import React, { Component } from 'react'
import { connect } from 'react-redux'
import { action as toggleSelector } from 'redux-burger-menu'

import ForecastPage from '../components/ForecastPage'
import api from '../helpers/api'
import Navbar from '../components/Navbar'
import SpotSelectDrawer from '../components/SpotSelectDrawer'

import { fetchForecast, resetAppData } from '../actions/data'
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
    spots: [{ name: 'Newport', id: '1241', }, { name: 'HB', id: '3421', }],
  }
]

class ForecastPageContainer extends Component {
  constructor(props) {
    super(props)

    this.regions = regions
    this.renderForecastPage = this.renderForecastPage.bind(this)
  }

  componentWillMount() {}

  renderForecastPage() {
    return (
      <div className="forecast-page">
        <SpotSelectDrawer
          pageWrapId={'forecast-page'}
          outerContainerId={'forecast-page'}
          options={this.regions}
          {...this.props}
        />
        <div className="forecast-page">
          <Navbar />
          <ForecastPage {...this.props} />
        </div>
      </div>
    )
  }

  render() {
    return this.renderForecastPage()
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  resetAppState: () => dispatch(resetAppState()),
  incrementDay: activeDay => dispatch(incrementDay(activeDay)),
  decrementDay: activeDay => dispatch(decrementDay(activeDay)),
  toggleSelector: () => dispatch(toggleSelector(true)),
  closeClick: () => dispatch(viewedWelcomeMessage()),
  fetchRegion: (region) => {
    // User interacted with page, no need to show welcome message again
    dispatch(viewedWelcomeMessage())
    // Reset the App State since selecting a new region changes the spots available
    dispatch(resetAppState())
    // Reset the app data so that the flag "forecastFetched" is back to false
    dispatch(resetAppData())
    // Dispatch an action to update the selected region
    dispatch(setRegion(region))
    // Dispatch a Thunk to fetch the response of the API call and update the QA analysis
    return api.fetchSpot(region.id).then((response) => {
      dispatch(fetchForecast(response.data, false))
    })
  },
  fetchSpot: (spot) => {
    // Reset the app data so that the flag "forecastFetched" is back to false
    dispatch(resetAppData())
    // Dispatch an action to update the selected spot
    dispatch(setSpot(spot))
    // Dispatch a Thunk to fetch the response of the API call and update the QA analysis
    return api.fetchSpot(spot.id).then((response) => {
      dispatch(fetchForecast(response.data, false))
    })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ForecastPageContainer)
