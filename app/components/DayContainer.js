import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'

DayContainer.propTypes = {
    date: PropTypes.array.isRequired,
}

function DayContainer(props){
    return (
        <div className='forecast-by-day'>
        {props.date.map( (date, index) => {
        return (
            date
        )
    })}
    </div>
    )
}

module.exports = DayContainer