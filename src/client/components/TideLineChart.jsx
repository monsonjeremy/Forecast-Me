// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts'

type Props = {
  xAxisDataKey: string,
  yAxisDataKey?: string,
  yAxisUpperBound: number,
  data: Array<Object>,
  width?: string | number,
  height?: string | number,
  margin?: Object,
  lineDataKey: string,
}

const yAxisNums = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7]

const TideLineChart = ({ xAxisDataKey,
  yAxisDataKey,
  yAxisUpperBound,
  lineDataKey,
  data,
  width,
  height,
  margin,
}: Props) =>
  (<ResponsiveContainer
    width={width}
    height={height}
    margin={margin}
  >
    <AreaChart
      margin={{ top: 10, right: 50, bottom: 10, left: 0 }}
      data={data}
    >
      <defs>
        <linearGradient id="colorTide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey={xAxisDataKey} tickLine={false} />
      <YAxis
        dataKey={yAxisDataKey}
        ticks={yAxisNums}
        domain={[-yAxisUpperBound, yAxisUpperBound]}
        tickLine={false}
      />
      <Area type="monotone" dataKey={lineDataKey} stroke="#8884d8" fillOpacity={1} fill="url(#colorTide)" />
    </AreaChart>
  </ResponsiveContainer>)

TideLineChart.propTypes = {
  xAxisDataKey: PropTypes.string.isRequired,
  yAxisUpperBound: PropTypes.number.isRequired,
  yAxisDataKey: PropTypes.string,
  data: PropTypes.instanceOf(Array).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.instanceOf(Object),
  lineDataKey: PropTypes.string,
}

TideLineChart.defaultProps = {
  margin: { top: 0, right: 0, left: 0, bottom: 0 },
  lineDataKey: 'height',
  yAxisDataKey: 'height',
  bar1Fill: '#036',
  bar2Fill: '#0058b0',
  stackId: 'a',
  width: '90%',
  height: 300,
  animationEasing: 'linear',
}

export default TideLineChart
