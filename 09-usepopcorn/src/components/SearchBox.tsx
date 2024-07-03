import ToggleBtn from "./ToggleBtn";
import {tempMovieDataType} from "../types";

type searchBoxPropsType = {
    onIsOpen: boolean;
    movies: tempMovieDataType[];
    onSetIsOpen: () => void
}

export default function SearchBox({onIsOpen , movies , onSetIsOpen}: searchBoxPropsType) {
    return(
        <div className="box">
        <ToggleBtn
            isOpen={onIsOpen}
            onClick={() => onSetIsOpen}
        ></ToggleBtn>
        {onIsOpen && (
            <ul className="list">
                {movies.length > 0 ? (
                    movies.map((movie: tempMovieDataType) => (
                        <li>
                            <img src={movie.Poster} alt={`${movie.Title} poster`}/>
                            <h3>{movie.Title}</h3>
                            <div>
                                <p>
                                    <span>🗓</span>
                                    <span>{movie.Year}</span>
                                </p>
                            </div>
                        </li>
                    ))
                ) : (
                    <strong>You don't have any movies yet 🎬</strong>
                )}
            </ul>
        )}
    </div>)
}