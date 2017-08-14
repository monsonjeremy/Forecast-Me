// @flow

import React from 'react'
import PropTypes from 'prop-types'
import StackedBarChartBar from './StackedBarChartBar'

type Props = {
  data: Object,
  xScale: Function,
  yScale: Function,
  heightScale: Function,
  colorScale: Function,
}

const StackedBarChartBars = ({ data, xScale, yScale, heightScale, colorScale }: Props) => {
  const makeBar = (d) => {
    const labelText = `${d.surfMin}-${d.surfMax}ft`
    const props = {
      label: labelText,
      showLabel: d.y0 > 0,
      x: xScale(new Date(d.date)), // Pass in date to retrieve X val
      y: yScale(d.y1), // Pass in data val to retrieve Y val
      width: xScale.bandwidth(), // Get the width of the bar
      height: heightScale(d.y1 - d.y0), // Top data - Bottom data to get height of bar
      colorFill: colorScale(d.keyName), // Get fill color for the bar
    }
    return <StackedBarChartBar {...props} />
  }
  return (
    <g className="bars">
      {data.map(bars => bars.map(bar => makeBar(bar)))}
    </g>
  )
}

StackedBarChartBars.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  heightScale: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
}

export default StackedBarChartBars
