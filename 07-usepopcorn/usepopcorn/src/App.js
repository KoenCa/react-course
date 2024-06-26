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
import { useMovies } from './hooks/useMovies'
import { useLocalStorageState } from './hooks/useLocalStorageState'

export default function App() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const { movies, isLoading, error } = useMovies(query)
  const [watchedMovies, setWatchedMovies] = useLocalStorageState(
    [],
    'watchedMovies'
  )

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
