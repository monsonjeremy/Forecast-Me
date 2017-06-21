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
      x: xScale(new Date(d.date)),
      y: yScale(d.y1),
      width: xScale.bandwidth(),
      height: heightScale(d.y1 - d.y0),
      colorFill: colorScale(d.keyName),
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
