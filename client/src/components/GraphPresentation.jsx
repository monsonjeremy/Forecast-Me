// @flow

import React, { PureComponent } from 'react'
import type { Node } from 'react'
import PropTypes from 'prop-types'
import { DataInterpolationWrapper, ParentResize } from '../containers'
import { ArrowButton, StackedBarChart, AreaChart } from './'

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
const ResponsiveTideChart = ParentResize(AreaChart)

const GraphBox = ({ title, children, className, }: GraphBoxProps) => (
  <div className={`graph-box ${className}`}>
    <div className="graph-box-title">
      <h3>{title}</h3>
    </div>
    <div>{children}</div>
  </div>
)

class GraphPresentation extends PureComponent<Props> {
  render() {
    const { dataSets, numDays, activeDay, decrementDay, incrementDay, } = this.props
    return (
      <div className="forecast-graphs text-center">
        <ArrowButton
          className={'arrow-wrapper'}
          orientation={'left'}
          disabled={!(activeDay > 0)}
          onClick={() => decrementDay(activeDay)}
        />
        <div className="graphs-container charts-wrapper" key="graph-container">
          <GraphBox className="surf-chart" title={'Surf Forecast'}>
            <ResponsiveSurfChart {...dataSets.surf} />
          </GraphBox>
          <GraphBox className="tide-chart" title={'Tide Forecast'}>
            <ResponsiveTideChart {...dataSets.tide} />
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
