import {tempMovieDataType} from "../types";
import Movie from "./Movie";

type searchBoxPropsType = {
    movies: tempMovieDataType[];
    handleSelectMovie: (id: string) => void;
}

export default function MovieList({  movies , handleSelectMovie }: searchBoxPropsType) {

    console.log(movies);

    return(
        <ul className="list list-movies">
            {
                movies?.map((movie: tempMovieDataType) => (
                    <Movie key={movie.imdbID} movie={movie} onSelectMovie={handleSelectMovie}></Movie>
                ))
             }
        </ul>
  )
}