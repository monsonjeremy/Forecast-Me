import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'
import DropdownList from './DropdownList'

function RegionSelector (props) {
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

    return (
        <div className="content col-xs-3 col-md-3">
            <div className="btn-group">
                <DropdownList 
                    list={regions} 
                    title={ props.selectedRegion == null ? 'Select Your Region' : props.selectedRegion.name }
                    keyName = 'region-selector'
                    id = 'region-selector-dropdown'
                    actions = {props.onSelect}
                />
            </div>
        </div>
    )
}

RegionSelector.propTypes = {
    selectedRegion: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
}

module.exports = RegionSelector