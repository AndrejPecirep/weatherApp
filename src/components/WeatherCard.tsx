import React from 'react'
import { CurrentWeather } from '../types'

type Props = {
  locationName: string
  current: CurrentWeather
  unit: 'C' | 'F'
}

function cToF(c: number) {
  return c * 9 / 5 + 32
}

export default function WeatherCard({ locationName, current, unit }: Props) {
  const temp =
    unit === 'C'
      ? current.temperature
      : Math.round(cToF(current.temperature))

  return (
    <div className="weather-card">
      <div className="weather-row">
        <div>
          <h2>{locationName}</h2>
          <div className="time">
            {new Date(current.time).toLocaleString()}
          </div>
        </div>

        <div className="right">
          <div className="temperature">{temp}°</div>
          <div className="windspeed">
            Vjetar {current.windspeed} km/h
          </div>
        </div>
      </div>
    </div>
  )
}