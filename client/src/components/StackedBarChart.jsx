// @flow

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import { HorizontalAxis } from './'

type Props = {
  data: Object,
  size: Array<number>,
  view: Array<number>,
  margins: Array<number>,
  xScale: Function,
  yScale: Function,
  keys: Array<string>,
  keyColors: Array<string>,
  xScaleKey: string,
  labelFn: Function,
  tickValues: Array<any>,
  tickOffset: number,
}
type BarProps = {
  data: Object,
  xScale: Function,
  yScale: Function,
  keys: Array<string>,
  keyColors: Array<string>,
  xScaleKey: string,
}

/**
 * Since we have multiple lines that we want to generate, this function will handle rendering them
 * For each data key that we want to render a line for it will take the data points for each data key
 * and do all the math using D3, and then create the SVG elements
 * 
 * @param {Array<Object>} data 
 * @param {Function} xScale 
 * @param {string} xScaleKey 
 * @param {Function} yScale 
 * @param {Array<string>} keys 
 * @param {Array<string>} keyColors 
 * @returns SVG rect
 */
const Bars = ({ data, xScale, xScaleKey, yScale, keys, keyColors, }: BarProps) => {
  // Creates a color scale based on data keys
  const colorScale = d3
    .scaleOrdinal()
    .domain(keys)
    .range(keyColors)

  // Instantiate stack based on the keys
  const stack = d3
    .stack()
    .keys(keys)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone)

  // Use the stack generator to create the data
  const stackData = stack(data)
  const bars = stackData.map((datum, datumIndex) =>
    datum.map(d => {
      const x = xScale(d.data[xScaleKey])
      const y = yScale(d[1])
      const height = yScale(d[0]) - yScale(d[1])
      const width = xScale.bandwidth()
      const barMiddle = width / 2
      if (datumIndex === stackData.length - 1) {
        return (
          <g key={`${datum.key}-${x}-${y}-${height}-${width}`}>
            <rect x={x} y={y} height={height} width={width} fill={colorScale(datum.key)} />
            <text x={x + barMiddle} y={y - 3} style={{ fontSize: '4px', }} textAnchor={'middle'}>
              {d.data.label}
            </text>
          </g>
        )
      }
      return (
        <rect
          x={x}
          y={y}
          key={`rect-${x}-${y}`}
          height={height}
          width={width}
          fill={colorScale(datum.key)}
        />
      )
    })
  )
  // Return all the lines to be rendered in a grouping
  return <g key={'bar-charting-grouping'}>{bars.map(key => key.map(bar => bar))}</g>
}

/**
 * Class for a react component to create a bar chart with axes
 * 
 * @class StackedBarChart
 * @extends {PureComponent<Props>}
 */
class StackedBarChart extends PureComponent<Props> {
  static defaultProps: Object

  render() {
    const {
      size,
      margins,
      data,
      view,
      keys,
      keyColors,
      xScaleKey,
      xScale,
      yScale,
      labelFn,
      tickValues,
      tickOffset,
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
      <svg className="stacked-bar-chart-svg" {...{ viewBox, }}>
        <g className="graph-and-axes" {...{ transform, }}>
          <g className="bars" key="bars">
            <Bars {...{ data, xScale, xScaleKey, yScale, keys, keyColors, }} />
          </g>
          <g className="horizontal-axis" key="stached-bar-chart-x-axis">
            <HorizontalAxis
              {...{
                widthScale: xScale,
                scale: xScale,
                useWidthScaleForTicks: true,
                view,
                margins,
                tickValues,
                tickOffset,
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
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  keyColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  labelFn: PropTypes.func,
  tickValues: PropTypes.arrayOf(PropTypes.any),
  tickOffset: PropTypes.number,
  xScaleKey: PropTypes.string.isRequired,
}

StackedBarChart.defaultProps = {
  labelFn: tick => tick,
  tickValues: [],
  tickOffset: 0,
}

export default StackedBarChart
