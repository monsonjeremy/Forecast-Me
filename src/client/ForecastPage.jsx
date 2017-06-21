// @flow

import React from 'react'
import api from '../shared/api'
import DayContainer from './DayContainer'
import SiteNavbar from './SiteNavbar'
import DropdownSelector from './DropdownSelector'
import { formatSurflineData, roundUpMaxSurfHeight } from '../shared/dataManipulation'
import AnimatedDataWrapper from './components/stacked_bar_chart/AnimatedDataWrapper'

const regions = [
  {
    name: 'Santa Cruz',
    id: '2958',
    spots: [
      { name: 'Steamer Lane', id: '4188' },
      { name: 'Four Mile', id: '5023' },
      { name: 'Waddell Creek', id: '5021' },
      { name: "Mitchell's Cove", id: '5028' },
      { name: '26th Ave', id: '5030' },
    ],
  },
  {
    name: 'North Orange Country',
    id: '2143',
    spots: [{ name: 'Newport', id: '1241' }, { name: 'HB', id: '3421' }],
  },
]

const AnimatedDayContainer = AnimatedDataWrapper('forecast')(DayContainer)

class ForecastPage extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedRegion: null,
      selectedSpot: null,
      forecast: null,
      index: 0,
    }

    this.regionSpotList = regions
    this.updateSpot = this.updateSpot.bind(this)
    this.updateRegion = this.updateRegion.bind(this)
    this.isSpot = this.isSpot.bind(this)
    this.isLoading = this.isLoading.bind(this)
    this.spotSelectorTitle = this.spotSelectorTitle.bind(this)
    this.arrowClick = this.arrowClick.bind(this)
  }

  state: {
    selectedRegion: any,
    selectedSpot: any,
    forecast: any,
    index: number,
  }

  regionSpotList: Array<Object>
  updateRegion: Function
  updateSpot: Function
  isSpot: Function
  isLoading: Function
  spotSelectorTitle: Function
  arrowClick: Function

  updateRegion(region: Object) {
    this.setState({
      selectedRegion: region,
      selectedSpot: null,
      forecast: null,
      index: 0,
    })

    api.fetchSpot(region.id).then((forecast) => {
      this.setState({
        forecast,
      })
    })
  }

  updateSpot(spot: Object) {
    this.setState({
      selectedSpot: spot,
      forecast: null,
      index: 0,
    })

    api.fetchSpot(spot.id).then((forecast) => {
      this.setState({
        forecast,
      })
    })
  }

  isSpot() {
    if (this.state.selectedSpot === null) {
      return false
    }

    return true
  }

  isLoading() {
    if ((this.state.selectedSpot || this.state.selectedRegion) && !this.state.forecast) {
      return (
        <div className="forecast-container container-fluid">
          <div className="text-center row">
            <div className="wave-wrapper col-xs-12">
              <h1 className="loading-text">LOADING...</h1>
              <div className="wave" />
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="forecast-container container-fluid">
        <div className="text-center row">
          <h1 className="col-xs-12 col-md-12">WELCOME!</h1>
          <h3 className="col-xs-12 col-md-12">Please select a location above</h3>
        </div>
      </div>
    )
  }

  spotSelectorTitle() {
    const isSpotSelected =
      this.state.selectedSpot == null ||
      !this.state.selectedRegion.spots.includes(this.state.selectedSpot)

    return isSpotSelected ? 'Select A Spot' : this.state.selectedSpot.name
  }

  arrowClick(arrow: String) {
    if (arrow === 'left') {
      this.setState(prevState => ({
        selectedRegion: prevState.selectedRegion,
        selectedSpot: prevState.selectedSpot,
        forecast: prevState.forecast,
        index: prevState.index - 1,
      }))
    }
    if (arrow === 'right') {
      this.setState(prevState => ({
        selectedRegion: prevState.selectedRegion,
        selectedSpot: prevState.selectedSpot,
        forecast: prevState.forecast,
        index: prevState.index + 1,
      }))
    }
  }

  render() {
    let unformattedSurfData = { dateStamp: [] }
    let props = null
    let topBarDataKey = 'aggSurfMax'
    let bottomBarDataKey = 'aggSurfMin'

    if (this.isSpot()) {
      topBarDataKey = 'surfMax'
      bottomBarDataKey = 'surfMin'
    }

    const dataKeys = [bottomBarDataKey, topBarDataKey]

    if (this.state.forecast) {
      unformattedSurfData = this.state.forecast.Surf
      const dayForecastDateStrings = unformattedSurfData.dateStamp[this.state.index]
      const forecastDay = this.state.index

      const formattedSurfData = formatSurflineData(
        dayForecastDateStrings,
        unformattedSurfData,
        forecastDay,
        this.isSpot(),
      )

      props = {
        date: dayForecastDateStrings,
        forecast: formattedSurfData,
        maxSurf: roundUpMaxSurfHeight(unformattedSurfData.surf_max_maximum) + 3,
        dataKeys,
      }
    }

    return (
      <div>
        <SiteNavbar className="forecastme-nav" />
        <div className="container-fluid forecast-header img-fluid">
          <div className="forecast-header-content">
            <div className="text-center" id="forecast-selectors">
              <div className="text-center">
                <DropdownSelector
                  options={this.regionSpotList}
                  onSelect={this.updateRegion}
                  title={
                    this.state.selectedRegion == null
                      ? 'Select Your Region'
                      : this.state.selectedRegion.name
                  }
                  keyName={'region-selector'}
                  id={'region-selector-dropdown'}
                />
                {this.state.selectedRegion != null &&
                  <DropdownSelector
                    options={this.state.selectedRegion.spots}
                    onSelect={this.updateSpot}
                    keyName={'spot-selector'}
                    id={'spot-selector-dropdown'}
                    title={this.spotSelectorTitle()}
                  />}
              </div>
            </div>
          </div>
        </div>
        {!this.state.forecast
          ? this.isLoading()
          : <div className="forecast-box container-fluid">
            <div className="row is-flex">
              <div className="col-s-12 col-md-1 arrowdiv textcenter">
                {this.state.index > 0
                    ? <div
                      className="previous_btn"
                      title="Previous"
                      onClick={() => this.arrowClick('left')}
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
                <AnimatedDayContainer {...props} />
              </div>
              <div className="col-s-12 col-md-1 arrowdiv textcenter">
                {this.state.index < unformattedSurfData.dateStamp.length - 1
                    ? <div
                      className="next_btn"
                      title="Next"
                      onClick={() => this.arrowClick('right')}
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
          </div>}
      </div>
    )
  }
}

export default ForecastPage
