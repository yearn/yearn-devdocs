import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { BoostCalculationResult } from './veYFI-calculator'

type BoostChartProps = {
  data: any[]
  xVar: string
  dataKey: string
  gaugeName: string
  specificBoost?: BoostCalculationResult
}

const BoostChart: React.FC<BoostChartProps> = ({
  data,
  xVar,
  dataKey,
  gaugeName,
  specificBoost = { value: 0, boost: 0, valueUsd: 0, veYFI: 0 },
}) => {
  const xValues = data.map((d) => d[dataKey])
  const maxX = Math.max(...xValues)
  const minX = Math.min(...xValues)

  let verticalLineX = 0
  if (xVar === 'Amount Deposited in Gauge (USD)') {
    verticalLineX = specificBoost.valueUsd
  } else if (xVar === 'Amount Deposited in Gauge (Shares)') {
    verticalLineX = specificBoost.value
  }

  // If verticalLineX is not already a category, add it as a new data point in sorted order
  let chartData = data
  if (
    verticalLineX !== 0 &&
    !xValues.includes(verticalLineX) &&
    verticalLineX >= minX &&
    verticalLineX <= maxX
  ) {
    chartData = [...data, { [dataKey]: verticalLineX, boost: null }]
    // Sort the data by the dataKey so the new point is in the correct position
    chartData.sort((a, b) => a[dataKey] - b[dataKey])
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div> Boost For {gaugeName}</div>
      {verticalLineX !== 0 && (
        <div
          style={{ fontWeight: 500, margin: '0.5rem 0', textAlign: 'center' }}
        >
          value: {verticalLineX.toFixed(2)} &nbsp;|&nbsp; boost:{' '}
          {specificBoost.boost.toFixed(2)}x
        </div>
      )}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData} // <-- use chartData instead of data
          margin={{ top: 30, right: 30, left: 5, bottom: 30 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--chart-grid-color))"
          />
          <XAxis
            dataKey={dataKey}
            label={{ value: xVar, position: 'insideBottom', offset: -10 }}
            type="category"
            interval="equidistantPreserveStart"
            tickFormatter={(tick) => {
              if (maxX <= 5) return tick.toFixed(2)
              if (maxX <= 20) return tick.toFixed(1)
              if (tick < 1000) return Math.round(tick).toLocaleString()
              if (tick < 1000000) return (tick / 1000).toFixed(1) + 'k'
              if (tick < 1000000000) return (tick / 1000000).toFixed(1) + 'M'
              if (tick < 1000000000000)
                return (tick / 1000000000).toFixed(1) + 'B'
            }}
          />
          <YAxis
            dataKey="boost"
            label={{
              value: 'Boost',
              angle: -90,
              position: 'insideLeft',
              offset: 20,
            }}
            type="number"
            tickCount={12}
            domain={[0, 12]}
          />
          <Tooltip
            contentStyle={{ backgroundColor: 'var(--ifm-background-color)' }}
          />
          <Line
            type="monotone"
            dataKey="boost"
            stroke="var(--ifm-color-primary)"
            dot={false}
            isAnimationActive={false}
          />
          {/* Add vertical dashed line if value is not 0 */}
          {verticalLineX !== 0 && (
            <ReferenceLine
              x={verticalLineX}
              stroke="var(--ifm-color-primary)"
              strokeDasharray="6 6"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BoostChart
