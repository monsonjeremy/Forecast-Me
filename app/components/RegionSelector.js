import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'
import DropdownList from './DropdownList'

function RegionSelector (props) {
    return (
        <div className="content col-xs-3 col-md-3">
            <div className="btn-group">
                <DropdownList 
                    list={props.regions} 
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