// @flow

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import HorizontalAxis from './HorizontalAxis'
import buildVerticalAxis from './VerticalAxis'

type Props = {
  data: Array<{
    Localtime: string,
    Rawtime: string,
    height: number,
    printtime: string,
    time: number,
    type: string,
    utctime: string,
    lineChartCurtain: number,
  }>,
  size: Array<number>,
  view: Array<number>,
  margins: Array<number>,
  xScale: Function,
  xScaleKey: string,
  yScaleKey: string,
  yScale: Function,
  vertTickValues: Array<number>,
  horizTickValues: Array<number>,
  labelFn: Function,
}

/*
Since we have multiple lines that we want to generate, this function will handle rendering them
For each data key that we want to render a line for it will take the data points for each data key
and do all the math using D3, and then create the SVG elements
*/
const buildArea = (data, view, xScale, xScaleKey, yScale, yScaleKey) => {
  // Create an D3 Area instance to use to format the data
  const lineArea = d3
    .area()
    .x(d => xScale(d[xScaleKey]))
    .y0(yScale(0))
    .y1(d => yScale(d[yScaleKey]))
    .curve(d3.curveCatmullRom.alpha(0))

  // Create a line to go along the edge of the area we draw on the graph
  const line = d3
    .line()
    .x(d => xScale(d[xScaleKey]))
    .y(d => yScale(d[yScaleKey]))
    .curve(d3.curveCatmullRom.alpha(0))

  const area = (
    <path
      key={'chart-area'}
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
  const areaLine = (
    <path
      key={'chart-line'}
      d={line(data)}
      style={{ fill: 'none', stroke: 'black', strokeWidth: '.3px', }}
    />
  )

  // Return all the lines to be rendered in a grouping
  return (
    <g key={'area-chart-grouping'}>
      {area}
      {areaLine}
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
    const {
      size,
      margins,
      data,
      view,
      xScale,
      xScaleKey,
      yScale,
      yScaleKey,
      vertTickValues,
      horizTickValues,
      labelFn,
    } = this.props
    // Create view box for SVG and then consider margins for graph size
    const viewBox = `0 0 ${size[0]} ${size[1]}`

    const xCenter = margins[3] // Translate value to X center graph in SVG parent
    const yCenter = margins[0] // Translate value to Y center graph in SVG parent
    const transform = `translate(${xCenter}, ${yCenter})`

    /*
    Create an SVG with the desired view box size (makes it responsive to browser resizing)
    Inside the SVG render the graph within a group
    Render the Axes in their respective groups
    Render the Lines in their respective groups
    */
    return (
      <svg className="area-chart-svg" {...{ viewBox, }}>
        <g className="graph-and-axes" {...{ transform, }}>
          <g className="area">{buildArea(data, view, xScale, xScaleKey, yScale, yScaleKey)}</g>
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
  xScale: PropTypes.func.isRequired,
  xScaleKey: PropTypes.string.isRequired,
  yScaleKey: PropTypes.string.isRequired,
  yScale: PropTypes.func.isRequired,
  vertTickValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  horizTickValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  labelFn: PropTypes.func.isRequired,
}

export default AreaChart
