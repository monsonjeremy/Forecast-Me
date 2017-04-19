import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'
import SpotSelector from './SpotSelector'
import ForecastBox from './ForecastBox'
import DayContainer from './DayContainer'
import RegionSelector from './RegionSelector'

class ForecastPage extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            selectedRegion: null,
            selectedSpot: null,
            forecast: null,
        }

        this.updateSpot = this.updateSpot.bind(this)
        this.updateRegion = this.updateRegion.bind(this)
    }

    componentDidMount () {
        // this.updateSpot(this.state.selectedSpot)
    }

    updateRegion(region){
        this.setState(function () {
            return {
                selectedRegion: region,
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
            <div className='row region-spot-select'>
                <RegionSelector 
                onSelect={this.updateRegion}
                selectedRegion={this.state.selectedRegion}
                />
                {/*<SpotSelector 
                    selectedSpot={this.state.selectedSpot}
                    onSelect={this.updateSpot}
                    />*/}
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