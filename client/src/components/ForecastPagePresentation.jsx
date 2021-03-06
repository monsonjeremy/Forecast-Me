/* @flow */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ForecastHeader, GraphContainer } from './'

import '../stylesheets/ForecastPresentation.css'

type Props = {
  surf: Object,
  tide: Object,
  buoy: Object,
  isSpot: boolean,
  dataKeys: Array<string>,
  activeDay: number,
  incrementDay: Function,
  decrementDay: Function,
  spotName: string,
  appState: {
    forecastIsLoading: boolean,
  },
}

/**
 * Presentation Component for the Forecast Page
 * 
 * @class ForecastPagePresentation
 * @extends {Component<Props>}
 */
class ForecastPagePresentation extends Component<Props> {
  componentWillMount() {}

  shouldComponentUpdate(nextProps: Props) {
    const changedForecastType = this.props.isSpot !== nextProps.isSpot
    const forecastIsLoading = nextProps.appState.forecastIsLoading
    if (changedForecastType && forecastIsLoading) {
      return false
    }
    return true
  }

  render() {
    const { surf, buoy, spotName, activeDay, decrementDay, incrementDay, } = this.props
    const currDay = surf[activeDay][0].date
    const date = moment(currDay, 'MMMM DD, YYYY HH:mm:ss').format('ddd MMMM Do')
    const numDays = surf.length

    return (
      <div className="forecast-container">
        <div className="forecast">
          <ForecastHeader
            {...{ surf, buoy, numDays, spotName, date, activeDay, incrementDay, decrementDay, }}
          />
          <GraphContainer {...{ ...this.props, }} />
        </div>
      </div>
    )
  }
}

ForecastPagePresentation.propTypes = {
  appState: PropTypes.shape({
    forecastIsLoading: PropTypes.bool,
  }).isRequired,
}

export default ForecastPagePresentation
