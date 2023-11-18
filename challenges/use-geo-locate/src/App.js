import { useState } from 'react'
import { useGeoLocation } from './hooks/useGeoLocation'

function App() {
  const [countClicks, setCountClicks] = useState(0)
  const { getPosition, isLoading, lat, lng, error } = useGeoLocation(() =>
    setCountClicks(count => count + 1)
  )

  function handleGetPostiion() {
    setCountClicks(count => count + 1)
    getPosition()
  }

  return (
    <div>
      <button onClick={handleGetPostiion} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  )
}

export default App
