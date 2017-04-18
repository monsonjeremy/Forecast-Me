import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'
import DayContainer from './DayContainer'

function ForecastBox(props){
    return (
        <div className='forecast-box container'>
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

ForecastBox.propTypes = {
    forecast: PropTypes.object.isRequired,
}

module.exports = ForecastBox