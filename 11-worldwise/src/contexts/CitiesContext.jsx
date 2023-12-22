import { createContext, useState, useEffect, useContext } from 'react'

const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext()

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)

        const response = await fetch(`${BASE_URL}/cities`)
        const data = await response.json()
        setCities(data)
      } catch (error) {
        alert('An error occurred while fetching the cities.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [])

  async function getCity(id) {
    try {
      setIsLoading(true)

      const response = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await response.json()
      setCurrentCity(data)
    } catch (error) {
      alert('An error occurred while fetching the city.')
    } finally {
      setIsLoading(false)
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true)

      const response = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      })

      const data = await response.json()

      setCities(cities => [...cities, data])
    } catch (error) {
      alert('An error occurred while creating the city.')
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true)

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      })

      setCities(cities => cities.filter(city => city.id !== id))
    } catch (error) {
      alert('An error occurred while deleting the city.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isLoading,
        getCity,
        createCity,
        deleteCity,
      }}
    >
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
