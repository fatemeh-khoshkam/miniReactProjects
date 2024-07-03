import {tempWatchedDataType} from "../types";
import WatchedMovie from './WatchedMovie'


type watchedMoviesListPropsType = {
    onWatchedMovies: tempWatchedDataType[]
}

export default function watchedMoviesList({ onWatchedMovies }: watchedMoviesListPropsType) {
    return (
        <ul className="list">
        {onWatchedMovies.map((movie: tempWatchedDataType) => (
            <WatchedMovie movie={movie}></WatchedMovie>
        ))}
    </ul>
    );
}