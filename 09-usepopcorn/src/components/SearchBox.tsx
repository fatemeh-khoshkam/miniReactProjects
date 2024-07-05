import ToggleBtn from "./ToggleBtn";
import {tempMovieDataType} from "../types";
import {useState} from "react";
import Movie from "./Movie";

type searchBoxPropsType = {
    onIsOpen: boolean;
    movies: tempMovieDataType[];
    onSetIsOpen: () => void
}

export default function SearchBox({onIsOpen , movies , onSetIsOpen}: searchBoxPropsType) {
    const [selectedMovieId, setSelectedMovieId] = useState<string>('')

    function handleSelectMovie(id:string) {
        setSelectedMovieId((selectedMovieId) => (id === selectedMovieId ? '' : id));

        const newSelectedId = (id === selectedMovieId ? '' : id);
        console.log(newSelectedId); // Log the new selected ID

    }
    console.log(movies);

    return(
        <>
        <ToggleBtn
            isOpen={onIsOpen}
            onClick={() => onSetIsOpen}
        ></ToggleBtn>
        {onIsOpen && (
            <ul className="list list-movies">
                {
                    movies?.map((movie: tempMovieDataType) => (
                        <Movie key={movie.imdbID} movie={movie} onSelectMovie={handleSelectMovie}></Movie>
                    ))
                 }
            </ul>
        )}
    </>)
}