import { useState, useEffect } from 'react'
import { API_KEY } from '../constants'

export function useMovies(query) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()

    async function fetchMovies() {
      try {
        setIsLoading(true)
        setError('')

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: abortController.signal }
        )

        if (!res.ok)
          throw new Error('Something went wrong with fetching movies')

        const data = await res.json()

        if (data.Response === 'False') throw new Error('Movie not found')

        setMovies(data?.Search || [])
        setError('')
        setIsLoading(false)
      } catch (error) {
        if (error.name === 'AbortError') return

        setError(error.message)
        setIsLoading(false)
      }
    }

    if (query.length < 3) {
      setMovies([])
      setError('')
      setIsLoading(false)
      return
    }

    fetchMovies()

    return () => abortController.abort()
  }, [query])

  return { movies, isLoading, error }
}
