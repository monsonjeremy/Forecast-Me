// @flow

import React from 'react'
import PropTypes from 'prop-types'

import '../stylesheets/Arrows.css'

type Props = {
  orientation: string,
  onClick: Function,
  disabled: boolean,
}

const ArrowButton = ({ orientation, onClick, disabled, }: Props) => {
  if (orientation === 'left') {
    return (
      <div className="previous_btn" title="Previous" onClick={() => onClick()} role="button">
        <button disabled={disabled} className="left-arrow arrow-btn other-icon" />
      </div>
    )
  }
  return (
    <div className="next_btn" title="Next" onClick={() => onClick()} role="button">
      <button disabled={disabled} className="right-arrow arrow-btn other-icon" />
    </div>
  )
}

ArrowButton.PropTypes = {
  orientation: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ArrowButton
