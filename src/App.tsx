import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastChart from './components/ForecastChart'
import UnitToggle from './components/UnitToggle'
import { fetchWeather } from './services/weatherApi'
import { Coordinates } from './types'

export default function App() {
  const [locationName, setLocationName] = useState('Zagreb, HR')
  const [coords, setCoords] = useState<Coordinates | null>({
    latitude: 45.815,
    longitude: 15.9819,
  })
  const [unit, setUnit] = useState<'C' | 'F'>('C')
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState<any | null>(null)
  const [hourly, setHourly] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!coords) return
    setLoading(true)
    fetchWeather(coords)
      .then((res) => {
        setCurrent(res.current)
        setHourly(res.hourly)
        setError(null)
      })
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false))
  }, [coords])

  function handleSelect(place: { name: string; lat: number; lon: number }) {
    setLocationName(place.name)
    setCoords({ latitude: place.lat, longitude: place.lon })
  }

  return (
    <div className="app-container">
      <header>
        <h1>Weather • Modern</h1>
        <UnitToggle unit={unit} setUnit={setUnit} />
      </header>

      <main>
        <SearchBar onSelect={handleSelect} />

        {loading && <div className="status-card loading">Učitavanje...</div>}
        {error && <div className="status-card error">Greška: {error}</div>}

        {current && (
          <>
            <WeatherCard
              locationName={locationName}
              current={current}
              unit={unit}
            />
            <ForecastChart data={hourly} unit={unit} />
          </>
        )}

        <footer>
          Podaci: Open-Meteo • Dizajn: Custom CSS • Stack: React + TypeScript
        </footer>
      </main>
    </div>
  )
}