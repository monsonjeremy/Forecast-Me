// @flow

import React from 'react'
import PropTypes from 'prop-types'

type Props = {
  x: any,
  y: any,
  width: any,
  height: any,
  label: string,
  showLabel: boolean,
  colorFill: string,
}

const StackedBarChartBar = ({ x, y, width, height, label, showLabel, colorFill }: Props) => {
  const translate = `translate(${x}, ${y})`

  return (
    <g transform={translate} className="bar" key={`bar-${x}-${y}`}>
      <rect
        width={width}
        height={height}
        transform="translate(0, 1)"
        style={{ fill: colorFill }}
      />
      <text
        textAnchor="middle"
        x={width / 2}
        y={-15}
      >
        {showLabel === true ? label : ''}
      </text>
    </g>
  )
}

StackedBarChartBar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool.isRequired,
}

export default StackedBarChartBar
