import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { HourlyPoint } from '../types'

type Props = {
  data: HourlyPoint[]
  unit: 'C' | 'F'
}

function cToF(c: number) {
  return c * 9 / 5 + 32
}

export default function ForecastChart({ data, unit }: Props) {
  const prepared = data.slice(0, 24).map((p) => ({
    time: new Date(p.time).getHours() + ':00',
    temp: unit === 'C' ? p.temperature : Math.round(cToF(p.temperature)),
  }))

  return (
    <div className="forecast-chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={prepared}>
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}