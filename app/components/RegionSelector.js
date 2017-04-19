import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'

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
          name:'Los Angeles',
          id: '1234',
          spots:  
            [
                {name:'Newport', id:'1241'},
                {name:'HB', id:'3421'},
            ]
        }
    ]

    return (
        <div className="content col-xs-3 col-md-3">
            <div className="admin-panel"><label htmlFor="toggle" className="admin-text">Select Your Region</label></div>
            <input type="checkbox" id="toggle"/>
            <label className="cog octicon octicon-gear" htmlFor="toggle"></label>
            <div className="menu">
                <div className="arrow"></div>
                    {regions.map((region) => {
                        return (
                            <a href="#" key={region.name}>{region.name}<span className="icon octicon octicon-person"></span></a>
                        )
                    })}
            </div>
        </div>
    )
}

RegionSelector.propTypes = {
    selectedSpot: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
}

module.exports = RegionSelector