import React from 'react'

type Props = {
  unit: 'C' | 'F'
  setUnit: (u: 'C' | 'F') => void
}

export default function UnitToggle({ unit, setUnit }: Props) {
  return (
    <div className="unit-toggle">
      <button
        className={unit === 'C' ? 'active' : ''}
        onClick={() => setUnit('C')}
      >
        °C
      </button>

      <button
        className={unit === 'F' ? 'active' : ''}
        onClick={() => setUnit('F')}
      >
        °F
      </button>
    </div>
  )
}