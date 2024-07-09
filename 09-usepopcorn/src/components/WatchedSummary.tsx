import {tempWatchedDataType} from "../types";
import average from "../utils/average";

type WatchedSummaryPropsType = {
    watchedMovies: tempWatchedDataType[]
}

export default function WatchedSummary({ watchedMovies }: WatchedSummaryPropsType) {
    // const tempWatchedData:tempWatchedDataType[] = [
    //     {
    //         imdbID: "tt1375666",
    //         Title: "Inception",
    //         Year: "2010",
    //         Poster:
    //             "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    //         runtime: 148,
    //         imdbRating: 8.8,
    //         userRating: 10,
    //     },
    //     {
    //         imdbID: "tt0088763",
    //         Title: "Back to the Future",
    //         Year: "1985",
    //         Poster:
    //             "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    //         runtime: 116,
    //         imdbRating: 8.5,
    //         userRating: 9,
    //     },
    // ];

    console.log(watchedMovies)

    const avgImdbRating:number = average(
        watchedMovies.map((movie:tempWatchedDataType) => movie.imdbRating)
    );

    const avgUserRating:number = average(
        watchedMovies.map((movie: tempWatchedDataType) => movie.userRating)
    );

    const avgRuntime :number = average(
        watchedMovies.map((movie:tempWatchedDataType) => movie.runtime)
    );

 return (
     <div className="summary">
        <h2>Movies you watched</h2>
        <div>
            <p>
                <span>#️⃣</span>
                <span>{watchedMovies.length} movies</span>
            </p>
            <p>
                <span>⭐️</span>
                <span>{avgImdbRating}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{avgUserRating}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
            </p>
        </div>
    </div>
 )
}