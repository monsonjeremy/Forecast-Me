// @flow

import React from 'react'
import PropTypes from 'prop-types'

import '../stylesheets/Arrows.css'

type Props = {
  orientation: string,
  onClick: Function,
  disabled: boolean,
  className: string,
}

const ArrowButton = ({ orientation, onClick, disabled, className, }: Props) => {
  if (orientation === 'left') {
    return (
      <div
        className={`previous_btn ${className}`}
        title="Previous"
        onClick={() => onClick()}
        role="button"
      >
        <button disabled={disabled} className="left-arrow arrow-btn other-icon" />
      </div>
    )
  }
  return (
    <div className={`next_btn ${className}`} title="Next" onClick={() => onClick()} role="button">
      <button disabled={disabled} className="right-arrow arrow-btn other-icon" />
    </div>
  )
}

ArrowButton.PropTypes = {
  orientation: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
}

export default ArrowButton
