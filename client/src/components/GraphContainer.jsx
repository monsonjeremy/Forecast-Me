// @flow

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import moment from 'moment'

import { formatSurflineData, roundUpMaxSurfHeight, prepTideData } from '../helpers/helperFunctions'
import { GraphPresentation } from './'

type Props = {
  surf: {
    SwellSource: string,
    agg_direction1: Array<number>,
    agg_height1: Array<number>,
    agg_location: Array<number>,
    agg_period1: Array<number>,
    agg_spread1: Array<number>,
    agg_surf_max: Array<number>,
    agg_surf_min: Array<number>,
    dateStamp: Array<number>,
    modelCode: Array<number>,
    modelCodeDisplay: string,
    modelRun: Array<number>,
    modelRunDisplay: number,
    periodSchedule: Array<number>,
    startDate_GMT: number,
    startDate_LOCAL: number,
    startDate_pretty_GMT: string,
    startDate_pretty_LOCAL: string,
    surf_max: Array<number>,
    surf_max_maximum: number,
    surf_min: Array<number>,
    swell_direction1: Array<number>,
    swell_direction2: Array<number>,
    swell_direction3: Array<number>,
    swell_height1: Array<number>,
    swell_height2: Array<number>,
    swell_height3: Array<number>,
    swell_period1: Array<number>,
    swell_period2: Array<number>,
    swell_period3: Array<number>,
    units: string,
  },
  tide: {
    DisplayTides: string,
    Error: string,
    SunPoints: Array<{
      Localtime: string,
      Rawtime: string,
      time: number,
      type: string,
      utctime: string,
    }>,
    TideStation: string,
    TideType: string,
    dataPoints: Array<{
      Localtime: string,
      Rawtime: string,
      height: number,
      lineChartCurtain: number,
      printtime: string,
      time: number,
      type: string,
      utctime: string,
    }>,
    startDate_GMT: number,
    startDate_LOCAL: number,
    startDate_pretty_GMT: string,
    startDate_pretty_LOCAL: string,
    timezone: number,
    units: string,
  },
  activeDay: number,
  dayDateArray: Array<string>,
  date: string,
  isSpot: boolean,
  dataKeys: Array<string>,
  decrementDay: Function,
  incrementDay: Function,
}

class GraphContainer extends PureComponent<Props> {
  constructor(props: Props) {
    super(props)

    this.createSurfProps = this.createSurfProps.bind(this)
    this.createTideProps = this.createTideProps.bind(this)
  }

  createSurfProps = (margins: Array<number>) => {
    const { surf, activeDay, dayDateArray, isSpot, dataKeys, } = this.props

    // Massage ze data
    const data = formatSurflineData(dayDateArray, surf, activeDay, isSpot)
    const yMax = roundUpMaxSurfHeight(surf.surf_max_maximum)

    // Surf graph props
    const size = [100, 70]
    const vWidth = size[0] - margins[1] - margins[3]
    const vHeight = size[1] - margins[0] - margins[2]
    const view = [vWidth, vHeight]
    const xScaleKey = 'date'
    const labelFn = (tick: string) => moment(tick).format('hA')
    const keyColors = ['#1a1aff', '#66a3ff']

    const xScale = d3
      .scaleBand()
      // Creates a domain containing the 4 hours to graph
      .domain(data.map(d => d.date))
      .rangeRound([0, view[0]], 0.05) // Range of the X axis scale
      .paddingInner(0.05) // .05 padding between bars
    const yScale = d3
      .scaleLinear() // Creates a yScale to calculate Y position of the bar
      .domain([0, yMax]) // Sets the domain to be 0 to surfMax value pulled from API
      .range([view[1], 0])
    const tickValues = xScale.domain()
    const tickOffset = xScale.bandwidth() / 2

    return {
      data,
      view,
      size,
      keysToInterp: dataKeys,
      keys: dataKeys,
      keyColors,
      xScaleKey,
      yMax,
      xScale,
      yScale,
      labelFn,
      tickValues,
      tickOffset,
      margins,
    }
  }

  createTideProps = (margins: Array<number>) => {
    const { date, tide, } = this.props
    // Massage ze data
    const data = prepTideData(date, tide.dataPoints, 500)

    // Tide graph props
    const size = [500, 200]
    const vWidth = size[0] - margins[1] - margins[3]
    const vHeight = size[1] - margins[0] - margins[2]
    const view = [vWidth, vHeight]
    const yMax = d3.max(data, d => d.height)
    const yMin = d3.min(data, d => d.height) - 1
    const xScaleKey = 'time'
    const yScaleKey = 'height'

    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([view[1], 0])
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, d => d[xScaleKey]))
      .range([0, view[0]])
    const numTicks = Math.round(yMax) - Math.floor(yMin)
    const vertTickValues = yScale.ticks(numTicks)
    const horizTickValues = data.map(dataPoint => dataPoint[xScaleKey])
    const labelFn = (time: number) => moment(time * 1000).format('ha')

    return {
      data,
      mountInterpKeys: ['lineChartCurtain'],
      keysToInterp: ['height'],
      view,
      size,
      xScale,
      xScaleKey,
      yScale,
      yScaleKey,
      vertTickValues,
      horizTickValues,
      margins,
      labelFn,
    }
  }

  render() {
    const { surf, activeDay, decrementDay, incrementDay, } = this.props

    const numDays = surf.dateStamp.length

    // Margins for the axes of the graphs
    const margins = [15, 15, 15, 15]

    const dataSets = {
      surf: this.createSurfProps(margins),
      tide: this.createTideProps(margins),
    }

    return <GraphPresentation {...{ dataSets, numDays, incrementDay, decrementDay, activeDay, }} />
  }
}

GraphContainer.propTypes = {
  activeDay: PropTypes.number.isRequired,
  dayDateArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.string.isRequired,
  isSpot: PropTypes.bool.isRequired,
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  decrementDay: PropTypes.func.isRequired,
  incrementDay: PropTypes.func.isRequired,
  surf: PropTypes.shape({
    SwellSource: PropTypes.string.isRequired,
    agg_direction1: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    agg_height1: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    agg_location: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    agg_period1: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    agg_spread1: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    agg_surf_max: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    agg_surf_min: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    dateStamp: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    modelCode: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    modelCodeDisplay: PropTypes.string.isRequired,
    modelRun: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    modelRunDisplay: PropTypes.number.isRequired,
    periodSchedule: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    startDate_GMT: PropTypes.number.isRequired,
    startDate_LOCAL: PropTypes.number.isRequired,
    startDate_pretty_GMT: PropTypes.string.isRequired,
    startDate_pretty_LOCAL: PropTypes.string.isRequired,
    surf_max: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    surf_max_maximum: PropTypes.number.isRequired,
    surf_min: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    swell_direction1: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    swell_direction2: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    swell_direction3: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    swell_height1: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    swell_height2: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    swell_height3: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    swell_period1: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    swell_period2: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    swell_period3: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    units: PropTypes.string.isRequired,
  }).isRequired,
  tide: PropTypes.shape({
    DisplayTides: PropTypes.string.isRequired,
    Error: PropTypes.string.isRequired,
    SunPoints: PropTypes.arrayOf(
      PropTypes.shape({
        Localtime: PropTypes.string.isRequired,
        Rawtime: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        utctime: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    TideStation: PropTypes.string.isRequired,
    TideType: PropTypes.string.isRequired,
    dataPoints: PropTypes.arrayOf(
      PropTypes.shape({
        Localtime: PropTypes.string.isRequired,
        Rawtime: PropTypes.string.isRequired,
        height: PropTypes.number.isRequired,
        time: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        utctime: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    startDate_GMT: PropTypes.number.isRequired,
    startDate_LOCAL: PropTypes.number.isRequired,
    startDate_pretty_GMT: PropTypes.string.isRequired,
    startDate_pretty_LOCAL: PropTypes.string.isRequired,
    timezone: PropTypes.number.isRequired,
    units: PropTypes.string.isRequired,
  }).isRequired,
}

export default GraphContainer
