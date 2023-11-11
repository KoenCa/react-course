import { WatchedMovie } from './WatchedMovie';

export function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
