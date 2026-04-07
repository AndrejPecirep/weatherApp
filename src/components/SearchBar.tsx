import React, { useState } from 'react'

type Props = {
  onSelect: (place: { name: string; lat: number; lon: number }) => void
}

export default function SearchBar({ onSelect }: Props) {
  const [q, setQ] = useState('')
  const [results, setResults] = useState<any[]>([])

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!q) return

    const r = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        q
      )}&count=5&language=hr&format=json`
    )
    const j = await r.json()
    setResults(j.results || [])
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Traži grad ili mjesto..."
        />
        <button type="submit">Pretraži</button>
      </form>

      {results.length > 0 && (
        <ul>
          {results.map((r: any) => (
            <li
              key={r.id || r.latitude + r.longitude}
              onClick={() =>
                onSelect({
                  name: `${r.name}, ${r.country ?? ''}`.trim(),
                  lat: r.latitude,
                  lon: r.longitude,
                })
              }
            >
              <div>{r.name}</div>
              <div className="sub">
                {[r.admin1, r.country].filter(Boolean).join(', ')}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}