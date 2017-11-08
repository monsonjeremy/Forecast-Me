// @flow

import React from 'react'
import PropTypes from 'prop-types'
// import StackedBarChart from './stacked_bar_chart/StackedBarChart'
import StackedBarChart from './StackedBarChart'
import AreaChart from './AreaChart'
import ParentResize from '../containers/ParentResize'
import { DataInterpolationWrapper } from '../containers'

import '../stylesheets/GraphContainer.css'

type Props = {
  dataSets: Object,
}

export const GraphContainer = ({ dataSets, }: Props) => {
  const { tide, surf, } = dataSets

  // Make the graphs responsive
  const ResponsiveStackedBarChart = ParentResize(StackedBarChart)
  const ResponsiveTideChart = ParentResize(AreaChart)
  return (
    <div className="graphs-container charts-wrapper">
      <div className="surf-forecast" style={{ width: '50%', }}>
        {/* TODO: Remove these style tags and move to Sass */}
        <div className="surf-forecast-title text-center" style={{ width: '100%', margin: 'auto', }}>
          <h3>SURF</h3>
        </div>
        <div style={{ width: '100%', }}>
          <ResponsiveStackedBarChart {...surf} />
        </div>
      </div>
      <div className="tide-forecast full-width">
        {/* TODO: Remove these style tags and move to Sass */}
        <div className="tide-forecast-title text-center" style={{ width: '100%', margin: 'auto', }}>
          <h3>TIDE</h3>
        </div>
        <ResponsiveTideChart {...tide} />
      </div>
    </div>
  )
}

GraphContainer.propTypes = {
  dataSets: PropTypes.instanceOf(Object).isRequired,
}

export default DataInterpolationWrapper()(GraphContainer)
