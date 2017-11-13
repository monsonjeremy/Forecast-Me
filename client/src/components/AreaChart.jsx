// @flow

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import moment from 'moment'

import HorizontalAxis from './HorizontalAxis'
import buildVerticalAxis from './VerticalAxis'

type Data = {
  Localtime: string,
  Rawtime: string,
  height: number,
  printtime: string,
  time: number,
  type: string,
  utctime: string,
  lineChartCurtain: number,
}
type Props = {
  data: Array<Data>,
  size: Array<number>,
  view: Array<number>,
  margins: Array<number>,
}
/*
Since we have multiple lines that we want to generate, this function will handle rendering them
For each data key that we want to render a line for it will take the data points for each data key
and do all the math using D3, and then create the SVG elements
*/
const buildArea = (data, view, xScale, yScale) => {
  // Create an D3 Area instance to use to format the data
  const lineArea = d3
    .area()
    .x(d => xScale(d.time))
    .y0(yScale(0))
    .y1(d => yScale(d.height))
    .curve(d3.curveCatmullRom.alpha(0))

  // Create a line to go along the edge of the area we draw on the graph
  const line = d3
    .line()
    .x(d => xScale(d.time))
    .y(d => yScale(d.height))
    .curve(d3.curveCatmullRom.alpha(0))

  const area = (
    <path
      key={'tideArea'}
      d={lineArea(data)}
      style={{
        fill: 'blue',
      }}
    />
  )
  /*
  Map through the dataKeys and for each data key, create the line.
  Pass the color based on the key into the stroke style.
  */
  const tideLine = (
    <path
      key={'tideLine'}
      d={line(data)}
      style={{ fill: 'none', stroke: 'black', strokeWidth: '.3px', }}
    />
  )

  // Return all the lines to be rendered in a grouping
  return (
    <g key={'area-charting-grouping'}>
      {area}
      {tideLine}
    </g>
  )
}

/**
 * Area Chart component for passing in props to create an area chart
 * 
 * @class AreaChart
 * @extends {PureComponent<Props>}
 */
class AreaChart extends PureComponent<Props> {
  static defaultProps: Object

  render() {
    const { size, margins, data, view, } = this.props
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
    // Get the max number of tests ran to create the y scale for the graph
    const yMax = d3.max(data, d => d.height)
    const yMin = d3.min(data, d => d.height) - 1

    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([view[1], 0])
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, d => d.time))
      .range([0, view[0]])

    const numTicks = Math.round(yMax) - Math.floor(yMin)
    const vertTickValues = yScale.ticks(numTicks)
    const horizTickValues = data.map(dataPoint => dataPoint.time)

    const tickFormat = time => moment(time).format('ha')
    // Multiple the unix timestamp by 1000 to get the proper time
    const labelFn = value => tickFormat(value * 1000)

    /*
    Create an SVG with the desired view box size (makes it responsive to browser resizing)
    Inside the SVG render the graph within a group
    Render the Axes in their respective groups
    Render the Lines in their respective groups
    */
    return (
      <svg className="nulti-line-chart-svg dashboard-graph" {...{ viewBox, }}>
        <g className="graph-and-axes" {...{ transform, }}>
          <g className="lines">{buildArea(data, view, xScale, yScale)}</g>
          <g className="horizontal-axis">
            <HorizontalAxis
              {...{
                view,
                margins,
                widthScale: xScale,
                scale: xScale,
                tickValues: horizTickValues,
                labelFn,
              }}
            />
          </g>
          <g className="vertical-axis">
            {buildVerticalAxis(view, margins, yScale, vertTickValues)}
          </g>
        </g>
        <g className="curtain-rect" {...{ transform, }}>
          {/* Adding 0.5 px to width and height of the rect to ensure it covers everything */}
          <rect
            x={data[0].lineChartCurtain}
            y={0}
            width={view[0] + 0.5}
            height={view[1] + 0.5}
            style={{ fill: 'white', }}
          />
        </g>
      </svg>
    )
  }
}

AreaChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Localtime: PropTypes.string.isRequired,
      Rawtime: PropTypes.string.isRequired,
      height: PropTypes.number.isRequired,
      printtime: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      utctime: PropTypes.string.isRequired,
      lineChartCurtain: PropTypes.number.isRequired,
    })
  ).isRequired,
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
  view: PropTypes.arrayOf(PropTypes.number).isRequired,
  margins: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default AreaChart
