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
      <div className="forecast-box container-fluid">
        <div className="row is-flex">
          <div className="col-s-12 col-md-1 arrowdiv textcenter">
            {this.state.index > 0
              ? <div
                className="previous_btn"
                title="Previous"
                onClick={this.leftArrowClick}
                role="button"
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="65px"
                  height="65px"
                  viewBox="-11 -11.5 65 66"
                >
                  <g>
                    <g>
                      <path
                        fill="#474544"
                        d="M-10.5,22.118C-10.5,4.132,4.133-10.5,22.118-10.5S54.736,4.132,54.736,22.118
              c0,17.985-14.633,32.618-32.618,32.618S-10.5,40.103-10.5,22.118z M-8.288,22.118c0,16.766,13.639,30.406,30.406,30.406 c16.765,0,30.405-13.641,30.405-30.406c0-16.766-13.641-30.406-30.405-30.406C5.35-8.288-8.288,5.352-8.288,22.118z"
                      />
                      <path
                        fill="#474544"
                        d="M25.43,33.243L14.628,22.429c-0.433-0.432-0.433-1.132,0-1.564L25.43,10.051c0.432-0.432,1.132-0.432,1.563,0 c0.431,0.431,0.431,1.132,0,1.564L16.972,21.647l10.021,10.035c0.432,0.433,0.432,1.134,0,1.564 c-0.215,0.218-0.498,0.323-0.78,0.323C25.929,33.569,25.646,33.464,25.43,33.243z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              : <div className="previous_btn" title="Previous" />}
          </div>
          <div className="col-s-12 col-md-10">
            <DayContainer
              date={this.getData()}
              forecast={this.props.forecast}
              forecastDay={this.state.index}
              isSpot={this.props.isSpot}
            />
          </div>
          <div className="col-s-12 col-md-1 arrowdiv textcenter">
            {this.state.index < this.state.dates.length - 1
              ? <div className="next_btn" title="Next" onClick={this.rightArrowClick} role="button">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="65px"
                  height="65px"
                  viewBox="-11 -11.5 65 66"
                >
                  <g>
                    <g>
                      <path
                        fill="#474544"
                        d="M22.118,54.736C4.132,54.736-10.5,40.103-10.5,22.118C-10.5,4.132,4.132-10.5,22.118-10.5 c17.985,0,32.618,14.632,32.618,32.618C54.736,40.103,40.103,54.736,22.118,54.736z M22.118-8.288 c-16.765,0-30.406,13.64-30.406,30.406c0,16.766,13.641,30.406,30.406,30.406c16.768,0,30.406-13.641,30.406-30.406 C52.524,5.352,38.885-8.288,22.118-8.288z"
                      />
                      <path
                        fill="#474544"
                        d="M18.022,33.569c 0.282,0-0.566-0.105-0.781-0.323c-0.432-0.431-0.432-1.132,0-1.564l10.022-10.035 L17.241,11.615c 0.431-0.432-0.431-1.133,0-1.564c0.432-0.432,1.132-0.432,1.564,0l10.803,10.814c0.433,0.432,0.433,1.132,0,1.564 L18.805,33.243C18.59,33.464,18.306,33.569,18.022,33.569z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              : <div className="next_btn" title="Next" />}
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
