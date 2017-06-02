// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { area } from 'd3-shape'
import { scaleLinear, scaleTime } from 'd3-scale'
import { select } from 'd3-selection'

type Props = {
  data: Array<Object>,
  size: Array<number>,
}

const interpolations = [
  'linear',
  'step-before',
  'step-after',
  'basis',
  'basis-closed',
  'cardinal',
  'cardinal-closed']

class AreaChart extends Component {
  static defaultProps: Object

  constructor(props: Props) {
    super(props)
    this.createAreaChart = this.createAreaChart.bind(this)
    this.xScale = this.xScale.bind(this)
    this.yScale = this.yScale.bind(this)
  }

  componentDidMount() {
    this.createAreaChart()
  }

  componentDidUpdate() {
    this.createAreaChart()
  }

  xScale = (data: Array<Object>) => scaleTime().domain([data[0].time, data[data.length - 1].time])
    .rangeRound([0, this.props.size[0]])

  yScale = () => scaleLinear().domain([-7, 7])
    .range([this.props.size[1], 0])

  createAreaChart: Function

  createAreaChart() {
    // flow-disable-next-line
    const node = this.node

    select(node)
      .selectAll('path')
      .data(this.props.data)
      .enter()
      .append('path')

    select(node)
      .selectAll('path')
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll('line')
      .data(this.props.data)
      .attr('x', d => this.xScale(d.printtime))
      .attr('y', d => this.yScale(d.height))
      .interpolate(interpolations)
      .attr('fill', 'steelblue')
      .attr('stroke', 'black')
      .attr('strokeOpacity', 0.5)
  }

  render() {
    return (
      <div className="graphs">
        <svg
          // flow-disable-next-line
          ref={node => this.node = node} // eslint-disable-line
          width={this.props.size[0]} height={this.props.size[1]}
        />
      </div>
    )
  }
}

AreaChart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  size: PropTypes.instanceOf(Array),
}

AreaChart.defaultProps = {
  size: [300, 300],
}

export default AreaChart
