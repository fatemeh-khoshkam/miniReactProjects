import {useEffect, useState} from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import {tempWatchedDataType} from "../types";

const KEY:string = "6487f592";

type movie = {
    Title: string,
    Year: string,
    Poster: string,
    Runtime: string,
    imdbRating : string,
    Plot?: string,
    Released?: string,
    Actors?: string,
    Director?: string,
    Genre?: string,
}
const defaultMovie: movie = {
    Title: "",
    Year: "",
    Poster: "",
    Runtime: "",
    imdbRating: "",
    Plot: "",
    Released: "",
    Actors: "",
    Director: "",
    Genre: "",
};

type MovieDetailsProps = {
    selectedId:string,
    onCloseMovie: () => void,
    onAddWatched: (movie: tempWatchedDataType) => void,
    watched: tempWatchedDataType[]
}

export default function MovieDetails({ selectedId , onCloseMovie , onAddWatched , watched} : MovieDetailsProps) {
    const [movie,setMovie] = useState<movie>(defaultMovie);
    const [userRating, setUserRating] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isWatched:boolean = watched.map((movie:tempWatchedDataType) => movie.imdbID).includes(selectedId);
    const foundMovie = watched.find((movie: tempWatchedDataType) => movie.imdbID === selectedId);
    const watchedUserRating : number | null = foundMovie ? foundMovie.userRating : null

    useEffect(function (){
        async function fetchMovieDetails (){
            setIsLoading(true)
            const res = await fetch(`http://www.omdbapi.com/?i=${selectedId}&apikey=${KEY}`);
            const data = await res.json();
            setMovie(data)
            setUserRating(null);
            setIsLoading(false)

        }
        fetchMovieDetails()
    },[selectedId])


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
    } = movie;

    function handleAdd():void {
        const newWatchedMovie:tempWatchedDataType = {
            imdbID: selectedId,
            Title: title,
            Year: year,
            Poster: poster,
            runtime: Number(runtime.split(" ").at(0)),
            imdbRating: Number(imdbRating),
            userRating: userRating || 0
        };

        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    console.log(movie)
    return (
        <div className="details">
            {!isLoading ?
                (<>
                    <header>
                        <button className="btn-back" onClick={() => onCloseMovie()}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${movie} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {
                                isWatched ?
                                    <p>
                                        You rated this movie with {watchedUserRating} <span>⭐️</span>
                                    </p>
                                    :
                                    <>
                                        <StarRating
                                            maxRating={10}
                                            size={24}
                                            onSetRating={setUserRating}
                                            userRating={userRating}
                                        />
                                        { userRating !== null && userRating > 0 &&
                                            <button className="btn-add" onClick={handleAdd}>
                                                + Add to list
                                            </button>
                                        }
                                    </>
                            }
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>)
                :
                <Loader/>
            }
        </div>
    );
}