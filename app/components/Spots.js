import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'
import SelectSpot from './SelectSpot'
import ForecastBox from './ForecastBox'
import DayContainer from './DayContainer'

class Spots extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            selectedSpot: {name: 'Santa Cruz', id: '2958'},
            forecast: null
        }

        this.updateSpot = this.updateSpot.bind(this)
    }

    componentDidMount () {
        this.updateSpot(this.state.selectedSpot)
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
            <div className='container-fluid'>
                <SelectSpot 
                    selectedSpot={this.state.selectedSpot}
                    onSelect={this.updateSpot}
                    />
                <div>
                    {!this.state.forecast ? 
                        <div className="loading">
                            <div className="squareXS"></div>
                            <div className="squareXL"></div>
                        </div>
                    : <ForecastBox forecast={this.state.forecast} /> }
                </div>
            </div>
        )
    }
}


module.exports = Spots