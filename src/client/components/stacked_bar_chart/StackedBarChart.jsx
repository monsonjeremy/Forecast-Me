// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import StackedBarChartBar from './StackedBarChartBar'

class StackedBarChart extends Component {
  constructor(props: Object) {
    super(props)

    this.updateD3 = this.updateD3.bind(this)
    this.makeBar = this.makeBar.bind(this)
    this.xScale = d3.scaleBand()
    this.yScale = d3.scaleLinear()
    this.heightScale = d3.scaleLinear()
    this.color = d3.scaleOrdinal()
    this.stackedBarChart = d3.stack()

    this.updateD3(props)
  }

  componentWillReceiveProps(newProps: Object) {
    this.updateD3(newProps)
    this.forceUpdate()
  }

  stackedBarChart: Function
  updateD3: Function
  xScale: Function
  yScale: Function
  heightScale: Function
  color: Function
  makeBar: Function

  updateD3(props: Object) {
    this.stackedBarChart.keys(props.keys).order(d3.stackOrderNone).offset(d3.stackOffsetNone)

    this.xScale
      .domain(props.data.map(d => new Date(d.dateTime)))
      .rangeRound([0, props.width], 0.05)
      .padding(0.05)
    this.yScale
      .domain([0, props.yMax])
      .range([props.height - props.topMargin - props.bottomMargin, 0])
    this.heightScale
      .domain([0, props.yMax])
      .range([0, props.height - props.topMargin - props.bottomMargin])
    this.color.domain(props.keys).range(['#1a1aff', '#66a3ff'])
  }

  makeBar(data: Object) {
    const labelText = `${data.surfMin}-${data.surfMax}ft`
    const props = {
      label: labelText,
      showLabel: data.y0 > 0,
      x: this.xScale(new Date(data.date)),
      y: this.yScale(data.y1),
      width: this.xScale.bandwidth(),
      height: this.heightScale(data.y1 - data.y0),
      colorFill: this.color(data.keyName),
    }

    return <StackedBarChartBar {...props} />
  }

  render() {
    const translate = `translate(0, ${this.props.topMargin})`
    this.props.data.forEach((d) => {
      let yZero = 0
      d.surfTypes = this.color.domain().map((surf) => {
        const obj: {
          surfMin: number,
          surfMax: number,
          keyName: string,
          y0: number,
          y1: number,
          date: any,
        } = {
          surfMin: Math.round(d[this.props.keys[0]]),
          surfMax: Math.round(d[this.props.keys[0]] + d[this.props.keys[1]]),
          keyName: surf,
          y0: yZero,
          y1: (yZero += +d[surf]),
          date: d.dateTime,
        }
        return obj
      })
      d.total = d.surfTypes[d.surfTypes.length - 1].y1
    })

    return (
      <g className="histogram" transform={translate}>
        <g className="bars">
          {this.props.data.map(d => d.surfTypes.map(surfData => this.makeBar(surfData)))}
        </g>
      </g>
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
