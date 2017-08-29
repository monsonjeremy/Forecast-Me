// @flow

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AnimatedScaleWrapper from '../containers/AnimatedScaleWrapper'

type Props = {
  labelFn: Function,
  orientation: string,
  scale: Function,
  tickValues: Array<string | number | Date>,
  margins: Array<number>,
  view: Array<number>,
}

class VerticalAxis extends PureComponent {
  static propTypes = {
    labelFn: React.PropTypes.func.isRequired,
    orientation: React.PropTypes.string.isRequired,
    scale: React.PropTypes.func.isRequired,
    tickValues: React.PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
    ).isRequired,
    margins: React.PropTypes.arrayOf(PropTypes.number).isRequired,
    view: React.PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  static orientation = {
    LEFT: 'horizontal-axis-left',
    RIGHT: 'horizontal-axis-right',
  }

  constructor(props: Props) {
    super(props)

    this.buildTicks = this.buildTicks.bind(this)
  }

  buildTicks = () => {
    const { scale, margins, labelFn, tickValues, orientation, } = this.props
    return tickValues.map((tickValue, key) => {
      const tickLength = margins[0] / 6
      const yPos = scale(tickValue)
      let x2 = margins[0]
      let x1 = x2 - tickLength
      let anchorPosition = 'middle'
      const textXPos = x1 - tickLength
      if (orientation === VerticalAxis.orientation.RIGHT) {
        x1 = 0
        x2 = tickLength
        anchorPosition = 'start'
      }
      const transform = `translate(0, ${yPos})`
      return (
        <g {...{ transform, key, }}>
          <line
            {...{ x1, x2, }}
            className="chart__axis-tick chart__axis-tick--vertical"
            y1={0}
            y2={0}
          />
          <text
            dy={3}
            style={{ fontSize: '4px', }}
            className="chart__axis-text chart__axis-text--vertical"
            textAnchor={anchorPosition}
            x={textXPos}
            y={0}
          >
            {labelFn(tickValue)}
          </text>
        </g>
      )
    })
  }

  render() {
    const { view, margins, orientation, } = this.props
    let width = margins[3]
    let xPos = -width
    let x1 = width - 1
    if (orientation === VerticalAxis.orientation.RIGHT) {
      width = margins[1] // refactor, might be a bug here, haven't checked
      xPos = view[0]
      x1 = 0
    }
    const x2 = x1
    const transform = `translate(${xPos}, 0)`
    return (
      <g {...{ transform, }}>
        <line
          {...{ x1, x2, }}
          style={{ strokeWidth: '.5px', stroke: 'black', }}
          className="chart__axis-line chart__axis-line--vertical"
          y1={0}
          y2={view[1]}
        />
        {this.buildTicks()}
      </g>
    )
  }
}

const AnimatedVerticalAxis = AnimatedScaleWrapper(['scale'])(VerticalAxis)

const buildVerticalAxis = (view: Array<number>, margins: Array<number>, scale: Function) => {
  const orientation = VerticalAxis.orientation.LEFT
  const tickValues = scale.ticks()
  const labelFn = value => value
  return <AnimatedVerticalAxis {...{ scale, margins, view, tickValues, orientation, labelFn, }} />
}

export default buildVerticalAxis
