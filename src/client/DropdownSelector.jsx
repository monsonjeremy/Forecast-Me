// @flow

import React from 'react'
import PropTypes from 'prop-types'
import DropdownList from './DropdownList'

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
      <DropdownList
        list={options}
        title={title}
        keyName={keyName}
        id={id}
        actions={onSelect}
      />
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
