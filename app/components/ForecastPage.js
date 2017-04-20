import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'
import SpotSelector from './SpotSelector'
import ForecastBox from './ForecastBox'
import DayContainer from './DayContainer'
import RegionSelector from './RegionSelector'

var regions = [
    { 
        name:'Santa Cruz',
        id: '2958',
        spots:  
        [
            {name:'Steamer Lane', id:'4188'},
            {name:'Four Mile', id:'5023'},
            {name:'Waddell Creek', id:'5021'},
            {name: 'Mitchell\'s Cove', id:'5028'},
            {name: '26th Ave', id:'5030'}
        ]
    },
    { 
        name:'North Orange Country',
        id: '2143',
        spots:  
        [
            {name:'Newport', id:'1241'},
            {name:'HB', id:'3421'},
        ]
    }
]

class ForecastPage extends React.Component {

    constructor (props) {
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

    updateRegion(region){
        this.setState(function () {
            return {
                selectedRegion: region,
                forecast: null
            }
        })

        api.fetchSpot(region.id)
        .then(function (forecast) {
            this.setState(function () {
                return {
                    forecast: forecast,
                }
            })
        }.bind(this))
    }
    
    updateSpot(spot) {
        this.setState(function () {
            return {
                selectedSpot: spot,
                forecast: null
            }
        })

        api.fetchSpot(spot.id)
        .then(function (forecast) {
            this.setState(function () {
                return {
                    forecast: forecast,
                }
            })
        }.bind(this))
    }

    render() {
        return (
        <div>
            <div className='container-fluid row region-spot-select'>
                <RegionSelector 
                regions={this.regionSpotList}
                onSelect={this.updateRegion}
                selectedRegion={this.state.selectedRegion}
                />
                {this.state.selectedRegion != null &&
                    <SpotSelector
                    spots={this.state.selectedRegion.spots}
                    onSelect={this.updateSpot}
                    selectedSpot={this.state.selectedSpot}
                    />
                }
            </div>
            <div>
                {!this.state.forecast? 
                    <div>
                        Select A Region
                    </div>
                : <ForecastBox forecast={this.state.forecast} /> }
            </div>
        </div>
        )
    }
}


module.exports = ForecastPage