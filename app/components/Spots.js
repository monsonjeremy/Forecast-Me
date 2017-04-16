import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'

function SelectSpot (props) {
    var spots = [
        {name: 'Santa Cruz', id: '2958'},
        {name:'Steamer Lane', id:'4188'},
        {name:'Four Mile', id:'5023'},
        {name:'Waddell Creek', id:'5021'},
        {name: 'Mitchell\'s Cove', id:'5028'},
        {name: '26th Ave', id:'5030'}
    ]
    return (
        <div>
            <ul className='spots'>
                {spots.map((spot, index) => {
                    return (
                        <li
                            style = {spot.name === props.selectedSpot.name ? {color: '#d0021b'}: null}
                            onClick={props.onSelect.bind(null, spot)}
                            key={spot.name}>
                            {spot.name}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

SelectSpot.propTypes = {
    selectedSpot: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
}

ForecastBox.propTypes = {
    forecast: PropTypes.object.isRequired,
}

DayContainer.propTypes = {
    date: PropTypes.array.isRequired,
}

function ForecastBox(props){
    return (
        <div>
        {props.forecast.dateStamp.map((date, index) => {
            return (
                <div key={'date' + index} className='day-box'>
                    <DayContainer date={date} />
                </div>
            )
        })}
        </div>
    )
}

function DayContainer(props){
    return (
        <div className='forecast-by-day'>
        {props.date.map( (date, index) => {
        return (
            date
            /*<ul className='forecast-list'>
                {props.forecast.dateStamp.map((dateStamps, indexone) => {
                    {dateStamps.map((date, indextwo) => {
                        return (
                            <li key={date} className='date'>
                                {console.log('date: ' + JSON.stringify(date))}
                                {console.log('surf: ' + props.forecast.surf_max[indexone][indextwo])}
                                <div>{date}</div>
                                <div>{props.forecast.surf_max[indexone][indextwo]}</div>
                            </li>
                        )
                    })}
                })}
                <li className='surf-forecast'>
                </li>
            </ul>
            */
        )
    })}
    </div>
    )
}

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
            <div>
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