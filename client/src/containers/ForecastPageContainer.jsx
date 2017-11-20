import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { WelcomeContainer } from './'
import { ForecastPagePresentation, Loader, GetStarted } from '../components'
import { getCookie } from '../helpers'
import { incrementDay, decrementDay } from '../actions'

class ForecastPageContainer extends Component {
  constructor(props) {
    super(props)

    this.renderForecast = this.renderForecast.bind(this)
    this.renderGetStarted = this.renderGetStarted.bind(this)
    this.renderLoader = this.renderLoader.bind(this)
    this.renderWelcomeMessage = this.renderWelcomeMessage.bind(this)
  }

  renderForecast() {
    const forecastIsLoaded = this.props.appData.forecast && !this.props.appData.forecastIsLoading
    if (forecastIsLoaded) {
      const dataKeys = ['surfMin', 'surfMax']
      let spotName = ''

      if (this.props.appState.isSpot) {
        spotName = this.props.appState.selectedSpot.name
      } else {
        spotName = this.props.appState.selectedRegion.name
      }

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

  render() {
    return (
      <div className="forecast-page-container" key="forecast-page-container">
        {this.renderLoader()}
        {this.renderWelcomeMessage()}
        {this.renderGetStarted()}
        {this.renderForecast()}
      </div>
    )
  }
}

ForecastPageContainer.propTypes = {
  incrementDay: PropTypes.func.isRequired,
  decrementDay: PropTypes.func.isRequired,
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
    forecast: PropTypes.shape({
      Surf: PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.shape({
            date: PropTypes.string.isRequired,
            swellHeight1: PropTypes.number.isRequired,
            swellHeight2: PropTypes.number.isRequired,
            swellHeight3: PropTypes.number.isRequired,
            swellPeriod1: PropTypes.number.isRequired,
            swellPeriod2: PropTypes.number.isRequired,
            swellPeriod3: PropTypes.number.isRequired,
            swellDirection1: PropTypes.number.isRequired,
            swellDirection2: PropTypes.number.isRequired,
            swellDirection3: PropTypes.number.isRequired,
            surfMaxMaximum: PropTypes.number.isRequired,
            surfMax: PropTypes.number.isRequired,
            surfMin: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
          })
        )
      ),
      Tide: PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.shape({
            Localtime: PropTypes.string.isRequired,
            time: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            utctime: PropTypes.string.isRequired,
            Rawtime: PropTypes.string.isRequired,
            height: PropTypes.number.isRequired,
          })
        )
      ),
      Wind: PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.shape({
            date: PropTypes.string.isRequired,
            windDirection: PropTypes.number.isRequired,
            windSpeed: PropTypes.number.isRequired,
          })
        )
      ),
      Buoy: PropTypes.shape({
        '#YY': PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
        MM: PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
        DD: PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
        hh: PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
        mm: PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
        WVHT: PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
        SwH: PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
        SwP: PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
        WWH: PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
        WWP: PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
        SwD: PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
        WWD: PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
        STEEPNESS: PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
        APD: PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
        MWD: PropTypes.shape({
          units: PropTypes.string.isRequired,
          data: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      Sun: PropTypes.shape({
        sunriseLocaltime: PropTypes.string.isRequired,
        sunrise: PropTypes.number.isRequired,
        sunsetLocaltime: PropTypes.string.isRequired,
        sunset: PropTypes.number.isRequired,
      }).isRequired,
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ForecastPageContainer)
