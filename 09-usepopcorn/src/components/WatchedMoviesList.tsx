import {tempWatchedDataType} from "../types";
import WatchedMovie from './WatchedMovie'


type watchedMoviesListPropsType = {
    watchedMovies: tempWatchedDataType[]
}

export default function watchedMoviesList({ watchedMovies }: watchedMoviesListPropsType) {
    return (
        <ul className="list">
            {watchedMovies.map((movie: tempWatchedDataType) => (
                <WatchedMovie key={movie.imdbID} movie={movie}></WatchedMovie>
            ))}
        </ul>
    );
}