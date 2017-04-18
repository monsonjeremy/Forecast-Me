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

module.exports = SelectSpot