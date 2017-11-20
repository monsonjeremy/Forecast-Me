// @flow

import React, { PureComponent } from 'react'
import type { Node } from 'react'
import PropTypes from 'prop-types'
import { roundedRect } from '../helpers'

type Props = {
  data: Object,
  size: Array<number>,
  view: Array<number>,
  margins: Array<number>,
  xScale: Function,
  yScale: Function,
  barLabelFn: Function,
  colorScale: Function,
  keys: Array<string>,
  keyColors: Array<string>,
  xScaleKey: string,
  yScaleKey: string,
  labelFn: Function,
  tickValues: Array<any>,
  tickOffset: number,
  children: Node,
}
type BarProps = {
  data: Object,
  xScale: Function,
  yScale: Function,
  barLabelFn: Function,
  colorScale: Function,
  xScaleKey: string,
  yScaleKey: string,
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
 * @returns SVG rect grouping
 */
const Bars = ({ data, xScale, xScaleKey, yScale, yScaleKey, colorScale, barLabelFn, }: BarProps) => {
  const bars = data.map(d => {
    const x = xScale(d[xScaleKey])
    let y
    if (d[yScaleKey] > 0) {
      y = yScale(d[yScaleKey])
    } else {
      y = yScale(0)
    }

    const topLeftRounded = d[yScaleKey] > 0
    const topRightRounded = d[yScaleKey] > 0
    const bottomLeftRounded = d[yScaleKey] < 0
    const bottomRightRounded = d[yScaleKey] < 0
    const height = Math.abs(Math.round(10 * (yScale(d[yScaleKey]) - yScale(0))) / 10)
    const width = xScale.bandwidth()
    const barMiddle = width / 2
    return (
      <g key={`${d.key}-${x}-${y}-${height}-${width}`}>
        {height > 1 && height > -1 ? (
          <path
            d={roundedRect(
              x,
              y,
              width,
              height,
              3,
              topLeftRounded,
              topRightRounded,
              bottomLeftRounded,
              bottomRightRounded
            )}
            fill={colorScale(d)}
          />
        ) : (
          <rect {...{ x, y, height, width, fill: colorScale(d), }} />
        )}
        {barLabelFn ? (
          <text
            className="bar-chart-bar-label"
            x={x + barMiddle}
            y={d[yScaleKey] >= 0 ? y - 3 : y + height + 5}
            style={{ fontSize: '5px', }}
            textAnchor={'middle'}
          >
            {barLabelFn(d)}
          </text>
        ) : null}
      </g>
    )
  })
  // Return all the bars to be rendered in a grouping
  return <g key={'bar-charting-grouping'}>{bars.map(bar => bar)}</g>
}

/**
 * Class for a react component to create a bar chart with axes
 * 
 * @class BarChart
 * @extends {PureComponent<Props>}
 */
class BarChart extends PureComponent<Props> {
  static defaultProps: Object

  render() {
    const {
      size,
      margins,
      data,
      yScaleKey,
      xScaleKey,
      xScale,
      yScale,
      colorScale,
      children,
      barLabelFn,
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
            <Bars {...{ data, xScale, xScaleKey, yScale, yScaleKey, colorScale, barLabelFn, }} />
          </g>
          {children}
        </g>
      </svg>
    )
  }
}

BarChart.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
  view: PropTypes.arrayOf(PropTypes.number).isRequired,
  margins: PropTypes.arrayOf(PropTypes.number).isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  barLabelFn: PropTypes.func,
  colorScale: PropTypes.func.isRequired,
  xScaleKey: PropTypes.string.isRequired,
  yScaleKey: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

BarChart.defaultProps = {
  children: null,
  barLabelFn: null,
}

export default BarChart
