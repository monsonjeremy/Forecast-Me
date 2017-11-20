// @flow

import React, { PureComponent } from 'react'
import type { Node } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { DataInterpolationWrapper, ParentResize } from '../containers'
import { StackedBarChart, WindForecast, BarChart, HorizontalAxis, SunTimes, SwellList } from './'

import '../stylesheets/GraphContainer.css'

type Props = {
  dataSets: Object,
  sunData: {
    sunrise: number,
    sunset: number,
    sunsetLocaltime: string,
    sunriseLocaltime: string,
  },
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
    const { dataSets, sunData, } = this.props
    const { surf, tide, wind, } = dataSets
    return (
      <div className="forecast-graphs text-center">
        <div className="graphs-container charts-wrapper" key="graph-container">
          <GraphBox className="surf-chart" title="Surf">
            <ResponsiveSurfChart {...surf}>
              <HorizontalAxis
                widthScale={surf.xScale}
                scale={surf.xScale}
                useWidthScaleForTicks
                {...surf}
              />
            </ResponsiveSurfChart>
          </GraphBox>
          <GraphBox className="wind-chart" title="Wind">
            <WindForecast {...wind} />
          </GraphBox>
          <GraphBox className="tide-chart" title="Tide">
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
          <GraphBox className="swell-chart" title="Swells">
            <SwellList {...surf} />
          </GraphBox>
          <GraphBox className="sun-chart" title="Sunrise/Sunset">
            <SunTimes {...sunData} />
          </GraphBox>
        </div>
      </div>
    )
  }
}

GraphPresentation.propTypes = {
  sunData: PropTypes.shape({
    sunrise: PropTypes.number.isRequired,
    sunset: PropTypes.number.isRequired,
    sunsetLocaltime: PropTypes.string.isRequired,
    sunriseLocaltime: PropTypes.string.isRequired,
  }).isRequired,
  dataSets: PropTypes.shape({
    surf: PropTypes.shape({}).isRequired,
    tide: PropTypes.shape({}).isRequired,
  }).isRequired,
}

export default DataInterpolationWrapper()(GraphPresentation)
