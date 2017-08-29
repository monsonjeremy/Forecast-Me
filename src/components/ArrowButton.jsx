// @flow

import React from 'react'
import PropTypes from 'prop-types'

type Props = {
  orientation: string,
  onClick: Function,
}

const ArrowButton = ({ orientation, onClick, }: Props) => {
  if (orientation === 'left') {
    return (
      <div className="previous_btn" title="Previous" onClick={() => onClick()} role="button">
        <figure className="left-arrow other-icon" />
      </div>
    )
  }
  return (
    <div className="next_btn" title="Next" onClick={() => onClick()} role="button">
      <figure className="right-arrow other-icon" />
    </div>
  )
}

ArrowButton.PropTypes = {
  orientation: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ArrowButton
