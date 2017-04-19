import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'

function SpotSelector (props) {
    var spots = [
        { 
          region:'Santa Cruz',
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
          region:'Los Angeles',
          id: '1234',
          spots:  
            [
                {name:'Newport', id:'1241'},
                {name:'HB', id:'3421'},
            ]
        }
    ]

    return (
        <ul className='spot-selector container-fluid'>
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
    )
}

SpotSelector.propTypes = {
    selectedSpot: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
}

module.exports = SpotSelector