// @flow

import React from 'react'
import api from '../shared/api'
import DayContainer from './DayContainer'
import SiteNavbar from './SiteNavbar'
import DropdownSelector from './DropdownSelector'
import { formatSurflineData, roundUpMaxSurfHeight } from '../shared/dataManipulation'
import WelcomeMessage from './components/WelcomeMessage'
import LoadingAnimation from './components/LoadingAnimation'
import ArrowButton from './components/ArrowButton'
import AnimatedDataWrapper from './components/animation_helpers/AnimatedDataWrapper'

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
      return <LoadingAnimation />
    }
    return <WelcomeMessage />
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
                    ? <ArrowButton orientation={'left'} onClick={() => this.arrowClick('left')} />
                    : <div className="previous_btn" title="Previous" />}
              </div>
              <div className="col-s-12 col-md-10">
                <AnimatedDayContainer {...props} />
              </div>
              <div className="col-s-12 col-md-1 arrowdiv textcenter">
                {this.state.index < unformattedSurfData.dateStamp.length - 1
                    ? <ArrowButton orientation={'right'} onClick={() => this.arrowClick('right')} />
                    : <div className="next_btn" title="Next" />}
              </div>
            </div>
          </div>}
      </div>
    )
  }
}

export default ForecastPage
