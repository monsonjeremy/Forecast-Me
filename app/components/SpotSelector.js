import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'
import DropdownList from './DropdownList'

function SpotSelector (props) {
    return (
        <div className="content col-xs-3 col-md-3">
            <div className="btn-group">
                <DropdownList 
                    list={props.spots} 
                    title={ props.selectedSpot == null || !props.spots.includes(props.selectedSpot) ? 'Select A Spot' : props.selectedSpot.name }
                    keyName = 'spot-selector'
                    id = 'spot-selector-dropdown'
                    actions = {props.onSelect}
                />
            </div>
        </div>
    )
}

SpotSelector.propTypes = {
    selectedSpot: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
}

module.exports = SpotSelector