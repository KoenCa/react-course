import { createContext, useState, useEffect, useContext } from 'react'

const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext()

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)

        const response = await fetch(`${BASE_URL}/cities`)
        const json = await response.json()
        setCities(json)
      } catch (error) {
        alert('An error occurred while fetching the cities.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [])

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const contextValue = useContext(CitiesContext)

  if (contextValue === undefined) {
    throw new Error('useCities must be used within a CitiesProvider')
  }

  return contextValue
}

export { CitiesProvider, useCities }
