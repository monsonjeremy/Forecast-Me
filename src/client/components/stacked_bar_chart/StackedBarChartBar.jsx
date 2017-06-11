// @flow

import React from 'react'
import PropTypes from 'prop-types'

type Props = {
  x: number,
  y: number,
  width: number,
  height: number,
  surfheight: number,
}

const StackedBarChartBar = ({ x, y, width, height, surfheight }: Props) => {
  console.log(x)
  console.log(y)
  const translate = `translate(${x}, ${y})`
  const label = surfheight

  return (
    <g transform={translate} className="bar">
      <rect
        width={width}
        height={height - 2}
        transform="translate(0, 1)"
      />
      <text
        textAnchor="end"
        x={width - 5}
        y={(height / 2) + 3}
      >
        {label}
      </text>
    </g>
  )
}

StackedBarChartBar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  surfheight: PropTypes.number.isRequired,
}

export default StackedBarChartBar
