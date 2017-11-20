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
  numDays: number,
  wind: Array<Array<{
      date: string,
      windDirection: number,
      windSpeed: number,
    }>,>,
  sun: Array<{
    sunsetLocaltime: string,
    sunriseLocaltime: string,
  }>,
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
  tideMax: number,
  tideMin: number,
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
    this.createWindProps = this.createWindProps.bind(this)
  }

  createWindProps = () => {
    const { wind, activeDay, } = this.props
    const data = wind[activeDay]

    const keysToInterp = ['windSpeed', 'windDirection']

    return {
      data,
      keysToInterp,
    }
  }

  createSurfProps = () => {
    const { surf, activeDay, dataKeys, } = this.props
    const margins = [5, 5, 5, 5]
    // Massage ze data
    const data = surf[activeDay]
    const yMax = roundUpMaxSurfHeight(data[0].surfMaxMaximum)
    const keysToInterp = dataKeys

    // Surf graph props
    const size = [70, 40]
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
    const tickLength = 1.5

    return {
      data,
      keys: dataKeys,
      view,
      size,
      keysToInterp,
      keyColors,
      xScaleKey,
      yMax,
      xScale,
      yScale,
      labelFn,
      tickValues,
      tickOffset,
      tickLength,
      margins,
    }
  }

  createTideProps = () => {
    const { tide, activeDay, tideMin, tideMax, } = this.props
    // Massage ze data
    const data = tide[activeDay]
    const margins = [10, 5, 10, 5]
    // Tide graph props
    const size = [400, 130]
    const vWidth = size[0] - margins[1] - margins[3]
    const vHeight = size[1] - margins[0] - margins[2]
    const view = [vWidth, vHeight]
    const xScaleKey = 'time'
    const yScaleKey = 'height'
    const yScaleDomain = [Math.round(tideMin - 1), Math.round(tideMax + 1)]
    const tideLowsHighs = data.filter(d => d.type === 'High' || d.type === 'Low')

    // Make the domain slightly larger
    yScaleDomain[0] -= 1
    yScaleDomain[1] += 1
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.time))
      .range([0, view[0]]) // Range of the X axis scale
      .paddingInner(0.15) // .05 padding between bars
    const yScale = d3
      .scaleLinear() // Creates a yScale to calculate Y position of the bar
      .domain(yScaleDomain)
      .range([view[1], 0])
    const barLabelFn = (d: Object) => `${Math.round(10 * d.height) / 10}ft`
    const tickLabelFn = (d: any) => moment(d * 1000).format('H:mm')
    const colorScale = (d: Object) => {
      if (d.height > 0) {
        return '#1a1aff'
      }
      return '#66a3ff'
    }

    const showTicks = true
    const tickAnchor = 'middle'
    const tickLength = 0
    const tickValues = xScale.domain()
    const tickPos = (scale: Function) => scale(scale.domain()[0])
    const tickOffset = xScale.bandwidth() / 2
    return {
      data,
      mountInterpKeys: ['height'],
      keysToInterp: ['height'],
      view,
      size,
      xScale,
      xScaleKey,
      yScale,
      yScaleKey,
      margins,
      barLabelFn,
      tickLabelFn,
      colorScale,
      tickLength,
      tickPos,
      showTicks,
      tickValues,
      tickAnchor,
      tickOffset,
      tideLowsHighs,
    }
  }

  render() {
    const { activeDay, decrementDay, incrementDay, sun, } = this.props

    const sunData = sun[activeDay]

    const dataSets = {
      surf: this.createSurfProps(),
      tide: this.createTideProps(),
      wind: this.createWindProps(),
    }

    return <GraphPresentation {...{ dataSets, incrementDay, decrementDay, activeDay, sunData, }} />
  }
}

GraphContainer.propTypes = {
  activeDay: PropTypes.number.isRequired,
  tideMax: PropTypes.number.isRequired,
  tideMin: PropTypes.number.isRequired,
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
      })
    ).isRequired
  ).isRequired,
  wind: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        windSpeed: PropTypes.number,
        windDirection: PropTypes.number,
      })
    )
  ).isRequired,
  sun: PropTypes.arrayOf(
    PropTypes.shape({
      sunriseLocaltime: PropTypes.string,
      sunsetLocaltime: PropTypes.string,
      sunrise: PropTypes.number,
      sunset: PropTypes.number,
    })
  ).isRequired,
}

export default GraphContainer
