import {useEffect, useState} from "react";
import Loader from "./Loader";
const KEY:string = "6487f592";


type movie = {
    Title: string,
    Year: string,
    Poster: string,
    Runtime: string,
    imdbRating : string,
    Plot: string,
    Released: string,
    Actors: string,
    Director: string,
    Genre: string,
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

export default function MovieDetails({ selectedId } : { selectedId:string }) {
    const [movie,setMovie] = useState<movie>(defaultMovie)

    useEffect(function (){
        async function fetchMovieDetails (){
            const res = await fetch(`http://www.omdbapi.com/?i=${selectedId}&apikey=${KEY}`);
            const data = await res.json();
            setMovie(data)
            console.log(data)
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


    console.log(movie)
    return (
        <div className="details">
            {movie.Title ?
                (<>
                    <header>
                        <button className="btn-back">
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

                    {/* <p>{avgRating}</p> */}

                    <section>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>)
                :
                <Loader />
            }
        </div>
    );
}