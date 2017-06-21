// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import StackedBarChartBars from './StackedBarChartBars'

type d3Data = {
  surfMin: number,
  surfMax: number,
  keyName: string,
  y0: number,
  y1: number,
  date: any,
}

class StackedBarChart extends Component {
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

  makeBars(data: Object) {
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
    const data = this.props.data.map((d) => {
      let yZero = 0
      return this.color.domain().map((surf) => {
        const obj: d3Data = {
          surfMin: Math.round(d[this.props.keys[0]]),
          surfMax: Math.round(d[this.props.keys[0]] + d[this.props.keys[1]]),
          keyName: surf,
          y0: yZero,
          y1: (yZero += +d[surf]),
          date: d.dateTime,
        }
        return obj
      })
    })

    return (
      <g className="histogram" transform={translate}>
        {this.makeBars(data)}
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
