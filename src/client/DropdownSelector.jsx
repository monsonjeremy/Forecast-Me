// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { DropdownButton, MenuItem } from 'react-bootstrap'

type Props = {
  options: Object,
  onSelect: Function,
  title: string,
  keyName: string,
  id: string,
}

const DropdownSelector = ({ title, options, keyName, id, onSelect }: Props) =>
  <div className="content">
    <div className="btn-group">
      <DropdownButton
        bsStyle={'primary'}
        title={title}
        key={keyName}
        id={id}
      >
        {options.map(element =>
          <MenuItem
            key={element.name}
            eventKey={element.name}
            onClick={() => onSelect(element)}
          >
            {element.name}
          </MenuItem>,
          )
        }
      </DropdownButton>
    </div>
  </div>


DropdownSelector.defaultProps = {
  id: null,
}

DropdownSelector.propTypes = {
  options: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  keyName: PropTypes.string.isRequired,
  id: PropTypes.string,
}

export default DropdownSelector
