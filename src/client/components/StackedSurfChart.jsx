// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

type Props = {
  xAxisDataKey: string,
  yAxisUpperBound: number,
  data: Array<Object>,
  width?: string | number,
  height?: string | number,
  margin?: Object,
  bar1Fill?: string,
  bar2Fill?: string,
  animationEasing?: string,
  stackId?: string,
  bottomBarDataKey: string,
  topBarDataKey: string,
}

const StackedSurfChart = ({ xAxisDataKey,
  yAxisUpperBound,
  bottomBarDataKey,
  topBarDataKey,
  data,
  width,
  height,
  margin,
  bar1Fill,
  bar2Fill,
  animationEasing,
  stackId,
}: Props) =>
  <ResponsiveContainer
    width={width}
    height={height}
    margin={margin}
  >
    <BarChart
      margin={{ top: 30, right: 30, bottom: 10, left: 30 }}
      data={data}
      barCategoryGap={2}
      barGap={2}
      barSize={70}
    >
      <XAxis dataKey={xAxisDataKey} tickLine={false} />
      <YAxis domain={[-0.5, yAxisUpperBound]} hide />
      <Bar
        dataKey={topBarDataKey}
        stackId={stackId}
        fill={bar2Fill}
        animationEasing={animationEasing}
        animationBegin={400}
        animationDuration={400}
        label
      />
      <Bar
        dataKey={bottomBarDataKey}
        stackId={stackId}
        fill={bar1Fill}
        animationEasing={animationEasing}
        animationBegin={0}
        animationDuration={400}
      />
    </BarChart>
  </ResponsiveContainer>

StackedSurfChart.propTypes = {
  xAxisDataKey: PropTypes.string.isRequired,
  yAxisUpperBound: PropTypes.number.isRequired,
  bottomBarDataKey: PropTypes.string.isRequired,
  topBarDataKey: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.instanceOf(Object),
  bar1Fill: PropTypes.string,
  bar2Fill: PropTypes.string,
  animationEasing: PropTypes.string,
  stackId: PropTypes.string,
}

StackedSurfChart.defaultProps = {
  margin: { top: 0, right: 0, left: 0, bottom: 0 },
  bar1Fill: '#036',
  bar2Fill: '#0058b0',
  stackId: 'a',
  width: '90%',
  height: 300,
  animationEasing: 'linear',
}

export default StackedSurfChart
