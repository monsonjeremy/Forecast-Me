// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { DropdownButton, MenuItem } from 'react-bootstrap'

type Props = {
  title: string,
  keyName: string,
  id: string,
  actions: Function,
  list: Object,
}

const DropdownList = ({ title, keyName, id, actions, list }: Props) =>
  <DropdownButton
    bsStyle={'primary'}
    title={title}
    key={keyName}
    id={id}
  >
    {list.map(element =>
      <MenuItem
        key={element.name}
        eventKey={element.name}
        onClick={actions.bind(null, element)}
      >
        {element.name}
      </MenuItem>,
      )
    }
  </DropdownButton>

DropdownList.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.instanceOf(Array).isRequired,
  keyName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default DropdownList
