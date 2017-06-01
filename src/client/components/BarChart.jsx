// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { scaleLinear, scaleThreshold } from 'd3-scale'
import { select } from 'd3-selection'

type Props = {
  data: Array<number>,
  size: Array<number>,
  surfGraphMax: number,
}

const colorScale = scaleThreshold()
  .domain([0, 5, 10, 15])
  .range(['#ff3333', '#ff8c1a', '#1a75ff', '#1aff1a'])

class BarChart extends Component {
  static defaultProps: Object

  constructor(props: Props) {
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }

  componentDidMount() {
    this.createBarChart()
  }

  componentDidUpdate() {
    this.createBarChart()
  }

  createBarChart: Function

  createBarChart() {
    // flow-disable-next-line
    const node = this.node
    const barWidth = this.props.size[0] / this.props.data.length
    const dataMax = this.props.surfGraphMax
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]])

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .attr('x', (d, i) => i * barWidth)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', barWidth)
      .style('fill', d => colorScale(d))
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

BarChart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  size: PropTypes.instanceOf(Array),
}

BarChart.defaultProps = {
  size: [300, 300],
}

export default BarChart
