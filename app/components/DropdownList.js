import React from 'react'
import PropTypes from 'prop-types'
var DropdownButton = require('react-bootstrap').DropdownButton
var MenuItem = require('react-bootstrap').MenuItem


function DropdownList (props) {
    return (
        <DropdownButton bsStyle={'primary'} 
                title={ props.title }
                key={props.keyName}
                id={props.id}>
            {props.list.map( (element) => {
                return (
                    <MenuItem key={element.name}
                        eventKey={element.name}
                        onClick={props.actions.bind(null, element)}>
                        {element.name}
                    </MenuItem>
                )
            })}
        </DropdownButton>
    )
}

DropdownList.propTypes = {
    list: PropTypes.array.isRequired,
}

module.exports = DropdownList