import { useState, useEffect, useRef } from 'react'
import { StarRating } from './StarRating'
import { Loader } from './Loader'
import { API_KEY } from '../constants'

export function MovieDetails({
  selectedId,
  watchedMovies,
  onCloseMovie,
  onAddWatched,
}) {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')

  const countRef = useRef(0)

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie

  const watchedMovieRating = watchedMovies.find(
    movie => movie.id === selectedId
  )?.userRating

  useEffect(() => {
    if (userRating) countRef.current++
  }, [userRating])

  useEffect(() => {
    function handleEscape(e) {
      if (e.code === 'Escape') onCloseMovie()
    }

    window.addEventListener('keydown', handleEscape)

    return () => window.removeEventListener('keydown', handleEscape)
  }, [onCloseMovie])

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true)

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        )

        if (!res.ok)
          throw new Error('Something went wrong with fetching movie details')

        const data = await res.json()

        setMovie(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    getMovieDetails()
  }, [selectedId])

  useEffect(() => {
    if (!title) return

    document.title = `Movie | ${title}`

    return () => {
      document.title = 'usePopcorn'
    }
  }, [title])

  function handleAddWatched() {
    const watchedMovie = {
      id: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
      runtime: Number(runtime.split(' ').at(0)),
      countRatingDescisions: countRef.current,
    }

    onAddWatched(watchedMovie)
    onCloseMovie()
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span> {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {watchedMovieRating ? (
                <p>
                  You rated this movie: <span>{watchedMovieRating}</span>
                  <span>🌟</span>
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      + Add to MovieList
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  )
}
