import {tempWatchedDataType} from "../types";

type WatchedMoviePropsType = {
    movie: tempWatchedDataType
    deleteMovie: (id:string) => void
}

export default function WatchedMovie({movie , deleteMovie} : WatchedMoviePropsType) {
    return (
        <li>
            <img src={movie.Poster} alt={`${movie.Title} poster`}/>
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
                <button
                    className="btn-delete"
                    onClick={() => deleteMovie(movie.imdbID)}
                >
                    X
                </button>
            </div>
        </li>
    )
}