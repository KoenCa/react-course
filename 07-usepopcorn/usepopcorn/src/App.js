import { useState, useEffect } from 'react'
import { Loader } from './components/Loader'
import { ErrorMessage } from './components/ErrorMessage'
import { NavBar } from './components/NavBar'
import { Search } from './components/Search'
import { NumResults } from './components/NumResults'
import { Main } from './components/Main'
import { Box } from './components/Box'
import { MovieList } from './components/MovieList'
import { MovieDetails } from './components/MovieDetails'
import { WatchedSummary } from './components/WatchedSummary'
import { WatchedMovieList } from './components/WatchedMovieList'
import { API_KEY } from './constants'

export default function App() {
  const [movies, setMovies] = useState([])
  const [watchedMovies, setWatchedMovies] = useState(() => {
    const storedWatchedMovies = localStorage.getItem('watchedMovies')
    return storedWatchedMovies ? JSON.parse(storedWatchedMovies) : []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)

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
      } catch (error) {
        if (error.name === 'AbortError') return

        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (query.length < 3) {
      setMovies([])
      setError('')
      return
    }

    handleCloseMovie()
    fetchMovies()

    return () => abortController.abort()
  }, [query])

  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies))
  }, [watchedMovies])

  function handleSelectMovie(id) {
    setSelectedId(selectedId => (selectedId === id ? null : id))
  }

  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleAddWatched(movie) {
    setWatchedMovies(watched => [...watched, movie])
  }

  function handleDeleteWatched(id) {
    setWatchedMovies(watched => watched.filter(movie => movie.id !== id))
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && !error && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage errorMsg={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watchedMovies={watchedMovies}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watchedMovies} />
              <WatchedMovieList
                watched={watchedMovies}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}
