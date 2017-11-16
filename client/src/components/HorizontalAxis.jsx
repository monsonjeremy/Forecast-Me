// @flow
/* eslint no-unused-expressions: [2, { "allowTernary": true }] */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AnimatedScaleWrapper } from '../containers'

type Props = {
  scale: Function,
  margins: Array<number>,
  view: Array<number>,
  widthScale: Function,
  yScale: Function,
  useWidthScaleForTicks?: boolean,
  tickValues: Array<Date | string | number>,
  labelFn: Function,
  orientation?: string,
  tickOffset?: number,
  tickLength: number,
  tickPos: number | Function,
  showTicks: true,
  tickAnchor: string,
}

class HorizontalAxis extends PureComponent<Props> {
  static defaultProps: Object
  static orientation = {
    BOTTOM: 'horizontal-axis-bottom',
    TOP: 'horizontal-axis-top',
  }
  constructor(props: Props) {
    super(props)

    this.buildTicks = this.buildTicks.bind(this)
  }

  buildTicks = (yPos: number) => {
    const {
      scale,
      tickOffset,
      widthScale,
      useWidthScaleForTicks,
      orientation,
      labelFn,
      tickLength,
      tickAnchor,
    } = this.props
    let { tickValues, } = this.props
    if (tickValues.length === 0) {
      tickValues = scale.ticks()
    }

    return tickValues.map((tickValue, key) => {
      let xPos = 0

      /*
      Since D3 TimeSeries doesn't have a discrete domain, it can kind of unreliable
      for drawing the ticks on the Axis in the correct spot. In this case we want to
      use a scaleBand or some other sort of scale. Set the widthScaleForTicks prop to
      true and pass in a secondary scale.
      */

      if (useWidthScaleForTicks) {
        xPos = widthScale(tickValue)
        xPos += tickOffset
      } else {
        xPos = scale(tickValue)
      }

      let y2 = yPos
      let y1 = y2 - tickLength
      if (orientation === HorizontalAxis.orientation.BOTTOM) {
        y2 = yPos + tickLength
        y1 = yPos
      }
      const transform = `translate(${xPos}, 0)`
      return (
        <g className="horizontal-axis-ticks-and-labels" {...{ transform, key, }}>
          {tickLength > 0 && (
            <line
              {...{ y1, y2, }}
              style={{ strokeWidth: '.5px', stroke: 'inherit', }}
              className="horizontal-axis-tick"
              x1={0}
              x2={0}
            />
          )}
          <text
            dy={'.5em'}
            className="horizontal-axis-tick-label"
            style={{ fontSize: 'inherit', fill: 'inherit', stroke: 'none', }}
            textAnchor={tickAnchor}
            x={0}
            y={y2 + 1}
          >
            {labelFn(tickValue)}
          </text>
        </g>
      )
    })
  }

  render() {
    const { view, showTicks, yScale, tickPos, } = this.props
    const [width] = view
    const yPos = yScale(0)
    let tickYPos
    if (tickPos instanceof Function) tickYPos = tickPos(yScale)
    else tickYPos = tickPos

    return (
      <g className="horizontal-axis">
        <line
          className="horizontal-axis-line"
          style={{ strokeWidth: '.5px', stroke: 'inherit', }}
          x1={0}
          y1={yPos}
          x2={width}
          y2={yPos}
        />
        {/* flow-disable-next-line */}
        {showTicks && this.buildTicks(tickYPos)}
      </g>
    )
  }
}

HorizontalAxis.defaultProps = {
  tickValues: [],
  useWidthScaleForTicks: false,
  orientation: 'horizontal-axis-bottom',
  tickOffset: 0,
  tickLength: 5,
  showTicks: true,
  tickPos: yScale => yScale(0),
  labelFn: data => data,
  tickAnchor: 'middle',
}

HorizontalAxis.propTypes = {
  scale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  widthScale: PropTypes.func.isRequired,
  margins: PropTypes.arrayOf(PropTypes.number).isRequired,
  view: PropTypes.arrayOf(PropTypes.number).isRequired,
  labelFn: PropTypes.func,
  tickValues: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
  ),
  tickOffset: PropTypes.number,
  tickPos: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  useWidthScaleForTicks: PropTypes.bool,
  orientation: PropTypes.string,
  showTicks: PropTypes.bool,
  tickLength: PropTypes.number,
  tickAnchor: PropTypes.string,
}

export default AnimatedScaleWrapper(['scale'])(HorizontalAxis)
