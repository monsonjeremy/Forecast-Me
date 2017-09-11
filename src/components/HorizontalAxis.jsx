// @flow
/* eslint no-unused-expressions: [2, { "allowTernary": true }] */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

type Props = {
  scale: Function,
  margins: Array<number>,
  view: Array<number>,
  widthScale: Function,
  useWidthScaleForTicks?: boolean,
  tickValues: Array<Date | string | number>,
  labelFn: Function,
  orientation?: string,
  tickOffset?: number,
}

class HorizontalAxis extends PureComponent {
  static defaultProps: Object
  static orientation = {
    BOTTOM: 'horizontal-axis-bottom',
    TOP: 'horizontal-axis-top',
  }
  constructor(props: Props) {
    super(props)

    this.buildTicks = this.buildTicks.bind(this)
  }

  buildTicks = () => {
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
      tickValues = scale.ticks(5)
    }

    return tickValues.map((tickValue, key) => {
      let xPos = 0

      /*
      Since D3 TimeSeries doesn't have a discrete domain, it can kind of unreliable
      for drawing the ticks on the Axis in the correct spot. In this case we want to
      use a scaleBand or some other sort of scale. Set the widthScaleForTicks prop to
      true and pass in a secondary scale.
      */
      useWidthScaleForTicks ? (xPos = widthScale(tickValue)) : (xPos = scale(tickValue))
      if (useWidthScaleForTicks) {
        xPos += tickOffset
      }

      let tickLength = margins[1] / 6
      let y2 = margins[1]
      let y1 = y2 - tickLength
      if (orientation === HorizontalAxis.orientation.BOTTOM) {
        tickLength = margins[3] / 9
        y2 = tickLength
        y1 = 0
      }
      const transform = `translate(${xPos}, 0)`
      return (
        <g {...{ transform, key, }}>
          <line
            {...{ y1, y2, }}
            style={{ strokeWidth: '.5px', stroke: 'black', }}
            className="chart__axis-tick chart__axis-tick--horizontal"
            x1={0}
            x2={0}
          />
          <text
            dy={'.5em'}
            className="chart__axis-text chart__axis-text--horizontal"
            style={{ fontSize: '4px', }}
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
    const { view, orientation, } = this.props
    const [width, height] = view
    let yPos = height
    if (orientation === HorizontalAxis.orientation.TOP) {
      yPos = 0
    }
    const transform = `translate(0, ${yPos})`
    return (
      <g {...{ transform, }}>
        <line
          className="chart__axis-line chart__axis-line--horizontal"
          style={{ strokeWidth: '.5px', stroke: 'black', }}
          x1={0}
          y1={0}
          x2={width}
          y2={0}
        />
        {this.buildTicks()}
      </g>
    )
  }
}

HorizontalAxis.defaultProps = {
  tickValues: [],
  useWidthScaleForTicks: false,
  orientation: 'horizontal-axis-bottom',
  tickOffset: 0,
}

HorizontalAxis.propTypes = {
  scale: PropTypes.func.isRequired,
  tickValues: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
  ),
  margins: PropTypes.arrayOf(PropTypes.number).isRequired,
  view: PropTypes.arrayOf(PropTypes.number).isRequired,
  tickOffset: PropTypes.number,
  widthScale: PropTypes.func.isRequired,
  labelFn: PropTypes.func.isRequired,
  useWidthScaleForTicks: PropTypes.bool,
  orientation: PropTypes.string,
}

export default HorizontalAxis
