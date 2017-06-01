// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { area, curveBasis } from 'd3-shape'
import { scaleLinear, scaleTime } from 'd3-scale'
import { select } from 'd3-selection'

type Props = {
  data: Array<Object>,
  size: Array<number>,
}

class AreaChart extends Component {
  static defaultProps: Object

  constructor(props: Props) {
    super(props)
    this.createAreaChart = this.createAreaChart.bind(this)
    this.xScale = this.xScale.bind(this)
    this.yScale = this.yScale.bind(this)
    this.tideArea = this.tideArea.bind(this)
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

  tideArea = () => area()
    .x(d => this.xScale(d.printtime))
    .y0(this.yScale(0))
    .y1(d => this.yScale(d.height))
    .curve(curveBasis)

  createAreaChart: Function

  createChart() {
    this.w = this.state.width - (this.props.margin.left + this.props.margin.right);
    this.h = this.props.height - (this.props.margin.top + this.props.margin.bottom);

    this.xScale = d3.time.scale()
        .domain(d3.extent(this.props.data, function (d) {
            return d[_self.props.xData];
        }))
        .rangeRound([0, this.w]);

    this.yScale = d3.scale.linear()
        .domain([0,d3.max(this.props.data,function(d){
            return d[_self.props.yData]+_self.props.yMaxBuffer;
        })])
        .range([this.h, 0]);

    this.area = d3.svg.area()
        .x(function (d) {
            return this.xScale(d[_self.props.xData]);
        })
        .y0(this.h)
        .y1(function (d) {
            return this.yScale(d[_self.props.yData]);
        }).interpolate(this.props.interpolations);


    var interpolations = [
        "linear",
        "step-before",
        "step-after",
        "basis",
        "basis-closed",
        "cardinal",
        "cardinal-closed"];

    this.line = d3.svg.line()
        .x(function (d) {
            return this.xScale(d[_self.props.xData]);
        })
        .y(function (d) {
            return this.yScale(d[_self.props.yData]);
        }).interpolate(this.props.interpolations);


    this.transform='translate(' + this.props.margin.left + ',' + this.props.margin.top + ')';
  }

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
      .selectAll('path')
      .data(this.props.data)
      .attr('x', (d, ) => i * barWidth)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', barWidth)
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