import { Coordinates, CurrentWeather, HourlyPoint } from '../types'

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

export async function fetchWeather(coords: Coordinates) {
  const url = new URL(FORECAST_URL)
  url.searchParams.set('latitude', String(coords.latitude))
  url.searchParams.set('longitude', String(coords.longitude))
  url.searchParams.set('current_weather', 'true')
  url.searchParams.set('hourly', 'temperature_2m')
  url.searchParams.set('timezone', 'auto')

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Neuspješno dohvaćanje vremenskih podataka')
  const data = await res.json()

  const current: CurrentWeather = {
    temperature: data.current_weather.temperature,
    windspeed: data.current_weather.windspeed,
    winddirection: data.current_weather.winddirection,
    weathercode: data.current_weather.weathercode,
    time: data.current_weather.time,
  }

  const hourly: HourlyPoint[] = data.hourly.time.map((t: string, i: number) => ({
    time: t,
    temperature: data.hourly.temperature_2m[i],
  }))

  return { current, hourly }
}
