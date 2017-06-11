// @flow

import React, { Component } from 'react'
import * as d3 from 'd3'
import StackedBarChartBar from './StackedBarChartBar'

class StackedBarChart extends Component {

  constructor(props: Object) {
    super(props)

    this.updateD3 = this.updateD3.bind(this)
    this.makeBar = this.makeBar.bind(this)
    this.xScale = d3.scaleLinear()
    this.yScale = d3.scaleLinear()
    this.color = d3.scaleOrdinal()
    this.stackedBarChart = d3.stack()

    this.updateD3(props)
  }

  componentWillReceiveProps(newProps: Object) {
    this.updateD3(newProps)
  }

  stackedBarChart: Function
  updateD3: Function
  xScale: Function
  yScale: Function
  color: Function
  makeBar: Function

  updateD3(props: Props) {
    console.log(props.data)
    this.stackedBarChart
      .keys(props.keys)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone)

    console.log(this.stackedBarChart(props.data))

    this.xScale
      .domain([(props.data.map(d => d.hour))])
      .rangeRound([0, props.width])
    this.yScale
      .domain([0, props.yMax])
      .range([0, props.height - props.topMargin - props.bottomMargin])
    this.color
      .range(['#98abc5', '#8a89a6', '#7b6888'])
  }

  makeBar(bar: Object) {
    const surfHeight = bar.y
    const props = {
      surfheight: surfHeight,
      x: this.props.axisMargin,
      y: this.yScale(bar.y),
      width: this.xScale(bar.x),
      height: this.yScale(bar.y),
      key: `histogram-bar-${bar.x}-${bar.y}`,
    }
    return (
      <StackedBarChartBar {...props} />
    )
  }

  render() {
    const translate = `translate(0, ${this.props.topMargin})`
    const bars = this.stackedBarChart(this.props.data)

    return (
      <g className="histogram" transform={translate}>
        <g className="bars">
          {bars.map(this.makeBar)}
        </g>
      </g>
    )
  }
}

export default StackedBarChart
