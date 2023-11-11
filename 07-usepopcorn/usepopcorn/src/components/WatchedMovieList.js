import { WatchedMovie } from './WatchedMovie'

export function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedMovie
          key={movie.id}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  )
}
