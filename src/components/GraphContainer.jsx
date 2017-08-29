// @flow

import React from 'react'
import PropTypes from 'prop-types'
import StackedBarChart from './stacked_bar_chart/StackedBarChart'
import AnimatedAreaChart from './AreaChart'

type Props = {
  data: Array<Object>,
  width: number,
  height: number,
  axisMargin: number,
  topMargin: number,
  bottomMargin: number,
  yMax: number,
  keys: Array<String>,
  tide: Array<Object>,
}

const GraphContainer = ({
  data,
  width,
  height,
  axisMargin,
  topMargin,
  bottomMargin,
  yMax,
  keys,
  tide,
}: Props) => {
  // Full width of the SVG Element containing the graph
  const props = {
    data,
    width,
    height,
    axisMargin,
    topMargin,
    bottomMargin,
    yMax,
    keys,
  }
  const graphFullWidth = 500

  // Tide graph props
  const size = [200, 100]
  const margins = [15, 15, 15, 15]
  const vwidth = size[0] - margins[1] - margins[3]
  const vheight = size[1] - margins[0] - margins[2]
  const view = [vwidth, vheight]
  const tideGraphProps = {
    data: tide,
    size,
    view,
    margins,
  }

  return (
    <div className="charts-wrapper row">
      <div className="surf-forecast-day col-xs-12 col-md-4 text-center">
        {/* TODO: Remove these style tags and move to Sass */}
        <div className="surf-forecast-title" style={{ width: '100%', margin: 'auto', }}>
          <h3>SURF</h3>
        </div>
        <div>
          <svg
            width={'100%'}
            height={'100%'}
            viewBox={`-100 150 ${graphFullWidth} ${String(height)}`}
          >
            <StackedBarChart {...props} />
          </svg>
        </div>
      </div>
      <div className="tide-forecast-day col-xs-12 col-md-8 text-center">
        {/* TODO: Remove these style tags and move to Sass */}
        <div className="tide-forecast-title" style={{ width: '100%', margin: 'auto', }}>
          <h3>TIDE</h3>
        </div>
        <div>
          <AnimatedAreaChart {...tideGraphProps} />
        </div>
      </div>
    </div>
  )
}

GraphContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  axisMargin: PropTypes.number.isRequired,
  topMargin: PropTypes.number.isRequired,
  bottomMargin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  keys: PropTypes.arrayOf(String).isRequired,
}

export default GraphContainer
