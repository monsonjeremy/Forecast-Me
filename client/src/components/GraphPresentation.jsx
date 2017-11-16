// @flow

import React, { PureComponent } from 'react'
import type { Node } from 'react'
import * as d3 from 'd3'
import moment from 'moment'
import PropTypes from 'prop-types'
import { DataInterpolationWrapper, ParentResize } from '../containers'
import { ArrowButton, StackedBarChart, BarChart, HorizontalAxis } from './'

import '../stylesheets/GraphContainer.css'

type Props = {
  dataSets: Object,
  numDays: number,
  activeDay: number,
  decrementDay: Function,
  incrementDay: Function,
}

type GraphBoxProps = {
  children: Node,
  title: string,
  className: string,
}

const ResponsiveSurfChart = ParentResize(StackedBarChart)
const ResponsiveTideChart = ParentResize(BarChart)

const GraphBox = ({ title, children, className, }: GraphBoxProps) => (
  <div className={`graph-box ${className}`}>
    <div className="graph-box-title">
      <h2>{title}</h2>
    </div>
    {children}
  </div>
)

class GraphPresentation extends PureComponent<Props> {
  render() {
    const { dataSets, numDays, activeDay, decrementDay, incrementDay, } = this.props
    const { surf, tide, } = dataSets
    return (
      <div className="forecast-graphs text-center">
        <ArrowButton
          className={'arrow-wrapper'}
          orientation={'left'}
          disabled={!(activeDay > 0)}
          onClick={() => decrementDay(activeDay)}
        />
        <div className="graphs-container charts-wrapper" key="graph-container">
          <GraphBox className="surf-chart" title={'Surf'}>
            <ResponsiveSurfChart {...surf}>
              <HorizontalAxis
                widthScale={surf.xScale}
                scale={surf.xScale}
                useWidthScaleForTicks
                {...surf}
              />
            </ResponsiveSurfChart>
          </GraphBox>
          <GraphBox className="tide-chart" title={'Tide'}>
            <div className="tide-lows-highs">
              {tide.tideLowsHighs.map(d => (
                <div className="tide-point" key={d.time}>
                  <h3>
                    {d.type} @ {moment(d.time * 1000).format('h:mm a')}
                  </h3>
                </div>
              ))}
            </div>
            <ResponsiveTideChart {...tide}>
              <HorizontalAxis
                useWidthScaleForTicks
                widthScale={tide.xScale}
                scale={tide.xScale}
                labelFn={tide.tickLabelFn}
                {...tide}
              />
            </ResponsiveTideChart>
          </GraphBox>
        </div>
        <ArrowButton
          className={'arrow-wrapper'}
          disabled={!(activeDay < numDays - 1)}
          orientation={'right'}
          onClick={() => incrementDay(activeDay)}
        />
      </div>
    )
  }
}

GraphPresentation.propTypes = {
  dataSets: PropTypes.shape({
    surf: PropTypes.shape({}).isRequired,
    tide: PropTypes.shape({}).isRequired,
  }).isRequired,
}

export default DataInterpolationWrapper()(GraphPresentation)
