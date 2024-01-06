import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from 'react'

const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext()

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      }
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      }
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      }
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity:
          state.currentCity.id === action.payload ? {} : state.currentCity,
      }
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      throw new Error(`Unhandled action type: ${action?.type}`)
  }
}

function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'loading' })

      try {
        const response = await fetch(`${BASE_URL}/cities`)
        const data = await response.json()
        dispatch({ type: 'cities/loaded', payload: data })
      } catch (error) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error while fecthing the cities.',
        })
      }
    }

    fetchCities()
  }, [])

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return

      dispatch({ type: 'loading' })

      try {
        const response = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await response.json()
        dispatch({ type: 'city/loaded', payload: data })
      } catch (error) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error while fetching the city.',
        })
      }
    },
    [currentCity.id]
  )

  async function createCity(newCity) {
    dispatch({ type: 'loading' })

    try {
      const response = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      })
      const data = await response.json()
      dispatch({ type: 'city/created', payload: data })
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error while creating the city.',
      })
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' })

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      })

      dispatch({ type: 'city/deleted', payload: id })
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error while deleting the city.',
      })
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isLoading,
        error,
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
