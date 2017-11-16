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
  showTicks: true,
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

  buildTicks = yPos => {
    const {
      scale,
      margins,
      tickOffset,
      widthScale,
      useWidthScaleForTicks,
      orientation,
      labelFn,
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

      let tickLength = margins[1] / 6
      let y2 = yPos
      let y1 = y2 - tickLength
      if (orientation === HorizontalAxis.orientation.BOTTOM) {
        tickLength = margins[3] / 9
        y2 = yPos + tickLength
        y1 = yPos
      }
      const transform = `translate(${xPos}, 0)`
      return (
        <g className="horizontal-axis-ticks-and-labels" {...{ transform, key, }}>
          <line
            {...{ y1, y2, }}
            style={{ strokeWidth: '.5px', stroke: 'inherit', }}
            className="horizontal-axis-tick"
            x1={0}
            x2={0}
          />
          <text
            dy={'.5em'}
            className="horizontal-axis-tick-label"
            style={{ fontSize: '4px', fill: 'inherit', }}
            textAnchor={'middle'}
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
    const { view, showTicks, yScale, } = this.props
    const [width] = view
    const yPos = yScale(0)
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
        {showTicks && this.buildTicks(yPos)}
      </g>
    )
  }
}

HorizontalAxis.defaultProps = {
  tickValues: [],
  useWidthScaleForTicks: false,
  orientation: 'horizontal-axis-bottom',
  tickOffset: 0,
  showTicks: true,
  labelFn: data => data,
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
  useWidthScaleForTicks: PropTypes.bool,
  orientation: PropTypes.string,
  showTicks: PropTypes.bool,
}

export default AnimatedScaleWrapper(['scale'])(HorizontalAxis)
