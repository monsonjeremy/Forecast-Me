// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DayContainer from './DayContainer'

import '../assets/stylesheets/daycontainer.scss'

type Props = {
  forecast: Object,
  isSpot: boolean,
}

class ForecastDateControl extends Component {

  constructor(props: Props) {
    super(props)
    this.state = {
      index: 0,
      dates: props.forecast.Surf.dateStamp,
    }

    this.getData = this.getData.bind(this)
    this.leftArrowClick = this.leftArrowClick.bind(this)
    this.rightArrowClick = this.rightArrowClick.bind(this)
  }

  state: {
    index: number,
    dates: Object,
  }

  getData: Function

  getData() {
    return this.state.dates[this.state.index]
  }

  leftArrowClick: Function
  rightArrowClick: Function

  leftArrowClick() {
    this.setState({
      index: this.state.index - 1,
      dates: this.state.dates,
    })
  }

  rightArrowClick() {
    this.setState({
      index: this.state.index + 1,
      dates: this.state.dates,
    })
  }

  render() {
    return (
      <div className="forecast-box container">
        <div className="row">
          <div className="col-xs-1 col-md-1 arrowdiv textcenter">
            {this.state.index > 0 ? <div className="arrowleft" onClick={this.leftArrowClick} role="button" tabIndex={0}>Prev Day</div> : ''}
          </div>
          <div className="col-xs-10 col-md-10">
            <DayContainer
              date={this.getData()}
              forecast={this.props.forecast}
              forecastDay={this.state.index}
              isSpot={this.props.isSpot}
            />
          </div>
          <div className="col-xs-1 col-md-1 arrowdiv textcenter">
            {this.state.index < this.state.dates.length - 1 ? <div className="arrowright" role="button" tabIndex={0} onClick={this.rightArrowClick}>Next Day</div> : ''}
          </div>
        </div>
      </div>
    )
  }
}

ForecastDateControl.propTypes = {
  forecast: PropTypes.instanceOf(Object).isRequired,
  isSpot: PropTypes.bool.isRequired,
}

export default ForecastDateControl
