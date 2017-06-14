// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { DropdownButton, MenuItem } from 'react-bootstrap'

type Props = {
  bsStyle?: string,
  options: Array<Object>,
  onSelect: Function,
  title: string,
  keyName: string,
  id: string,
  displayblock?: boolean,
}

const DropdownSelector = ({ bsStyle, title, options, keyName,
displayblock, id, onSelect }: Props) =>
  (<div className="content dropdown-selector">
    <div className="btn-group">
      <DropdownButton
        className="hover-effect"
        bsStyle={bsStyle}
        title={title}
        key={keyName}
        id={id}
        block={displayblock}
      >
        {options.map(element =>
          (<MenuItem
            key={element.name}
            eventKey={element.name}
            onClick={() => onSelect(element)}
          >
            {element.name}
          </MenuItem>),
          )
        }
      </DropdownButton>
    </div>
  </div>)

DropdownSelector.defaultProps = {
  id: null,
  bsStyle: null,
  displayblock: false,
}

DropdownSelector.propTypes = {
  bsStyle: PropTypes.string,
  options: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  keyName: PropTypes.string.isRequired,
  id: PropTypes.string,
  displayblock: PropTypes.bool,
}

export default DropdownSelector
