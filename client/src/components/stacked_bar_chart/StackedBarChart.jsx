// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import StackedBarChartBars from './StackedBarChartBars'

type Props = {
  topMargin: number,
  data: Object,
  keys: Array<string>,
  width: number,
  height: number,
}
class StackedBarChart extends Component<Props> {
  constructor(props: Object) {
    super(props)

    this.updateD3 = this.updateD3.bind(this)
    this.xScale = d3.scaleBand()
    this.yScale = d3.scaleLinear()
    this.heightScale = d3.scaleLinear()
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
  heightScale: Function
  color: Function
  makeBar: Function

  updateD3(props: Object) {
    this.stackedBarChart
      .keys(props.keys)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone)

    // Create an X axis scale based on the hours of the day we want bars for
    this.xScale
      // Creates a domain containing the 4 hours to graph
      .domain(props.data.map(d => new Date(d.dateTime)))
      .rangeRound([0, props.width], 0.05) // Range of the X axis scale
      .padding(0.05) // .05 padding between bars

    this.yScale // Creates a yScale to calculate Y position of the bar
      .domain([0, props.yMax]) // Sets the domain to be 0 to surfMax value pulled from API
      .range([props.height - props.topMargin - props.bottomMargin, 0]) // Sets range of Y scale

    this.heightScale // Creates a heightScale to calculate the height of the bar
      .domain([0, props.yMax])
      .range([0, props.height - props.topMargin - props.bottomMargin])

    // Creates a color scale based on data keys
    this.color.domain(props.keys).range(['#1a1aff', '#66a3ff'])
  }

  // Function to pass data to StackBarChartBars grouping and create the bar series
  createBarSeries(data: Object) {
    const props = {
      data,
      xScale: this.xScale,
      yScale: this.yScale,
      width: this.xScale,
      heightScale: this.heightScale,
      colorScale: this.color,
    }

    return <StackedBarChartBars {...props} />
  }

  render() {
    const translate = `translate(0, ${this.props.topMargin})`
    // Map through the data and return the necessary values to graph a bar
    const data = this.props.data.map((d) => {
      let yZero = 0
      // Map over the domain (keys used to access the data)
      // eslint-disable-next-line
      return this.color.domain().map(surfKey => ({
        /* TODO: This is why you need a stack generator...
        Accessing data based on the assumption that the keys are passed in with correct order
        this.props.keys = ['surfMin', 'surfMax'] or ['aggSurfMin', 'aggSurfMax'] */
        surfMin: Math.round(d[this.props.keys[0]]),
        surfMax: Math.round(d[this.props.keys[0]] + d[this.props.keys[1]]),
        keyName: surfKey,
        y0: yZero,
        y1: (yZero += +d[surfKey]), // Increment y0 to stack the bars
        date: d.dateTime,
      }))
    })

    return (
      <svg viewBox={`-100 150 ${this.props.width} ${String(this.props.height)}`}>
        <g className="histogram" transform={translate}>
          {this.createBarSeries(data)}
        </g>
      </svg>
    )
  }
}

StackedBarChart.propTypes = {
  topMargin: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  keys: PropTypes.instanceOf(Array).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default StackedBarChart
