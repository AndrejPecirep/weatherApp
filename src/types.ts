export type Coordinates = {
  latitude: number
  longitude: number
}

export type CurrentWeather = {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  time: string
}

export type HourlyPoint = {
  time: string
  temperature: number
}
