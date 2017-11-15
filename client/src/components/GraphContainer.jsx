// @flow

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import moment from 'moment'

import { roundUpMaxSurfHeight } from '../helpers/helperFunctions'
import { GraphPresentation } from './'

type Props = {
  surf: Array<Array<{
      date: string,
      periodSchedule: Array<number>,
      surfMax: Array<number>,
      surfMaxMaximum: number,
      surfMin: Array<number>,
      swellDirection1: Array<number>,
      swellDirection2: Array<number>,
      swellDirection3: Array<number>,
      swellHeight1: Array<number>,
      swellHeight2: Array<number>,
      swellHeight3: Array<number>,
      swellPeriod1: Array<number>,
      swellPeriod2: Array<number>,
      swellPeriod3: Array<number>,
    }>,>,
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
    const { surf, activeDay, dataKeys, } = this.props

    // Massage ze data
    const data = surf[activeDay]
    const yMax = roundUpMaxSurfHeight(data[0].surfMaxMaximum)

    // Surf graph props
    const size = [100, 70]
    const vWidth = size[0] - margins[1] - margins[3]
    const vHeight = size[1] - margins[0] - margins[2]
    const view = [vWidth, vHeight]
    const xScaleKey = 'date'
    const labelFn = (tick: string) =>
      moment(tick, 'MMMM DD, YYYY HH:mm:ss')
        .utc()
        .local()
        .format('hA')
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
    const { tide, activeDay, } = this.props
    // Massage ze data
    const data = tide[activeDay]

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

    const numDays = surf.length

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
  isSpot: PropTypes.bool.isRequired,
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  decrementDay: PropTypes.func.isRequired,
  incrementDay: PropTypes.func.isRequired,
  surf: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        surfMax: PropTypes.number.isRequired,
        surfMin: PropTypes.number.isRequired,
        swellDirection1: PropTypes.number.isRequired,
        swellDirection2: PropTypes.number.isRequired,
        swellDirection3: PropTypes.number.isRequired,
        swellHeight1: PropTypes.number.isRequired,
        swellHeight2: PropTypes.number.isRequired,
        swellHeight3: PropTypes.number.isRequired,
        swellPeriod1: PropTypes.number.isRequired,
        swellPeriod2: PropTypes.number.isRequired,
        swellPeriod3: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired
  ).isRequired,
  tide: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        Localtime: PropTypes.string.isRequired,
        Rawtime: PropTypes.string.isRequired,
        height: PropTypes.number.isRequired,
        time: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        utctime: PropTypes.string.isRequired,
        lineChartCurtain: PropTypes.number.isRequired,
      })
    ).isRequired
  ).isRequired,
}

export default GraphContainer
