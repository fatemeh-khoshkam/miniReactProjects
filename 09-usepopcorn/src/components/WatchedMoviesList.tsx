import {tempWatchedDataType} from "../types";
import WatchedMovie from './WatchedMovie'


type watchedMoviesListPropsType = {
    watchedMovies: tempWatchedDataType[],
    deleteMovie: (id:string) => void
}

export default function watchedMoviesList({ watchedMovies , deleteMovie }: watchedMoviesListPropsType) {
    return (
        <ul className="list">
            {watchedMovies.map((movie: tempWatchedDataType) => (
                <WatchedMovie key={movie.imdbID} movie={movie} deleteMovie={deleteMovie}></WatchedMovie>
            ))}
        </ul>
    );
}