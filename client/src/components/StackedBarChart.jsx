// @flow

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import moment from 'moment'

import HorizontalAxis from './HorizontalAxis'

/*
Since we have multiple lines that we want to generate, this function will handle rendering them
For each data key that we want to render a line for it will take the data points for each data key
and do all the math using D3, and then create the SVG elements
*/
const buildBars = (data, view, xScale, yScale, keys) => {
  // Creates a color scale based on data keys
  const colorScale = d3
    .scaleOrdinal()
    .domain(keys)
    .range(['#1a1aff', '#66a3ff'])

  // Instantiate stack based on the keys
  const stack = d3
    .stack()
    .keys(keys)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone)

  // Use the stack generator to create the data
  const stackData = stack(data)
  const bars = stackData.map((datum, datumIndex) =>
    datum.map((d) => {
      const x = xScale(new Date(d.data.dateTime))
      const y = yScale(d[1])
      const height = yScale(d[0]) - yScale(d[1])
      const width = xScale.bandwidth()
      const barMiddle = width / 2
      if (datumIndex === stackData.length - 1) {
        return (
          <g>
            <rect x={x} y={y} height={height} width={width} fill={colorScale(datum.key)} />
            <text x={x + barMiddle} y={y - 3} style={{ fontSize: '4px', }} textAnchor={'middle'}>
              {d.data.label}
            </text>
          </g>
        )
      }
      return <rect x={x} y={y} height={height} width={width} fill={colorScale(datum.key)} />
    })
  )
  // Return all the lines to be rendered in a grouping
  return <g key={'bar-charting-grouping'}>{bars.map(key => key.map(bar => bar))}</g>
}

/* const buildLabels = (data, xScale, yScale, keys) => {
  data.map(d => <text x={xScale(new Date(d.dateTime))} />)
} */

/*

*/
class StackedBarChart extends PureComponent {
  static defaultProps: Object

  render() {
    const { size, margins, data, view, yMax, keys, } = this.props
    // Create view box for SVG and then consider margins for graph size
    const viewBox = `0 0 ${size[0]} ${size[1]}`

    const xCenter = margins[3] // Translate value to X center graph in SVG parent
    const yCenter = margins[0] // Translate value to Y center graph in SVG parent
    const transform = `translate(${xCenter}, ${yCenter})`

    /*
    Since we have to pass the scales to both Axes and the Lines we
    create them in the top level of this component to avoid discrepancies
    in the scales being passed around
    */
    const xScale = d3
      .scaleBand()
      // Creates a domain containing the 4 hours to graph
      .domain(data.map(d => new Date(d.dateTime)))
      .rangeRound([0, view[0]], 0.05) // Range of the X axis scale
      .paddingInner(0.05) // .05 padding between bars

    const yScale = d3
      .scaleLinear() // Creates a yScale to calculate Y position of the bar
      .domain([0, yMax]) // Sets the domain to be 0 to surfMax value pulled from API
      .range([view[1], 0])

    const tickValues = xScale.domain()
    const labelFn = tick => moment(tick).format('hA')
    /*
    Create an SVG with the desired view box size (makes it responsive to browser resizing)
    Inside the SVG render the graph within a group
    Render the Axes in their respective groups
    Render the Lines in their respective groups
    */
    return (
      <svg className="nulti-line-chart-svg dashboard-graph" {...{ viewBox, }}>
        <g className="graph-and-axes" {...{ transform, }}>
          <g className="lines">{buildBars(data, view, xScale, yScale, keys)}</g>
          <g className="horizontal-axis">
            <HorizontalAxis
              {...{
                view,
                margins,
                widthScale: xScale,
                scale: xScale,
                tickValues,
                tickOffset: xScale.bandwidth() / 2,
                useWidthScaleForTicks: true,
                labelFn,
              }}
            />
          </g>
        </g>
      </svg>
    )
  }
}

StackedBarChart.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
  view: PropTypes.arrayOf(PropTypes.number).isRequired,
  margins: PropTypes.arrayOf(PropTypes.number).isRequired,
  yMax: PropTypes.number.isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default StackedBarChart
