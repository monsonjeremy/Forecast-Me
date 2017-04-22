import React from 'react'
import api from '../shared/api'
import ForecastBox from './ForecastBox'
import DropdownSelector from './DropdownSelector'

const regions = [
  {
    name: 'Santa Cruz',
    id: '2958',
    spots:
    [
      { name: 'Steamer Lane', id: '4188' },
      { name: 'Four Mile', id: '5023' },
      { name: 'Waddell Creek', id: '5021' },
      { name: 'Mitchell\'s Cove', id: '5028' },
      { name: '26th Ave', id: '5030' },
    ],
  },
  {
    name: 'North Orange Country',
    id: '2143',
    spots:
    [
      { name: 'Newport', id: '1241' },
      { name: 'HB', id: '3421' },
    ],
  },
]

class ForecastPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedRegion: null,
      selectedSpot: null,
      forecast: null,
    }

    this.regionSpotList = regions
    this.updateSpot = this.updateSpot.bind(this)
    this.updateRegion = this.updateRegion.bind(this)
  }

  updateRegion(region) {
    this.setState({
      selectedRegion: region,
      forecast: null,
    })

    api.fetchSpot(region.id)
    .then((forecast) => {
      this.setState({
        forecast,
      })
    })
  }

  updateSpot(spot) {
    this.setState({
      selectedSpot: spot,
      forecast: null,
    })

    api.fetchSpot(spot.id)
    .then((forecast) => {
      this.setState({
        forecast,
      })
    })
  }

  render() {
    return (
      <div>
        <div className="container-fluid row region-spot-select">
          <DropdownSelector
            options={this.regionSpotList}
            onSelect={this.updateRegion}
            title={this.state.selectedRegion == null ? 'Select Your Region' : this.state.selectedRegion.name}
            keyName={'region-selector'}
            id={'region-selector-dropdown'}
          />
          {this.state.selectedRegion != null &&
            <DropdownSelector
              options={this.state.selectedRegion.spots}
              onSelect={this.updateSpot}
              title={this.state.selectedSpot == null ||
              !this.state.selectedRegion.spots.includes(this.state.selectedSpot) ?
              'Select A Spot' :
              this.state.selectedSpot.name}
              keyName={'spot-selector'}
              id={'spot-selector-dropdown'}
            />
          }
        </div>
        <div>
          {!this.state.forecast ?
            <div>
              Select A Region
            </div>
          : <ForecastBox forecast={this.state.forecast} /> }
        </div>
      </div>
    )
  }
}

export default ForecastPage