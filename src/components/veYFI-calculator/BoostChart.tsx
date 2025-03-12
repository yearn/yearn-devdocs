import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type BoostChartProps = {
  data: any[]
  xVar: string
  dataKey: string
  gaugeName: string
}

const BoostChart: React.FC<BoostChartProps> = ({
  data,
  xVar,
  dataKey,
  gaugeName,
}) => {
  const xValues = data.map((d) => d[dataKey])
  const maxX = Math.max(...xValues)
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div> Boost For {gaugeName}</div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
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
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BoostChart
