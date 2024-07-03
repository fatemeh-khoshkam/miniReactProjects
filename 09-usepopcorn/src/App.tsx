import { useState } from "react";
import  { tempMovieDataType, tempWatchedDataType } from './types';
import Nav from "./components/Nav";
import average from "./utils/average";

const tempMovieData:tempMovieDataType[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData:tempWatchedDataType[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  return (
    <>
      <Nav></Nav>
      <Content></Content>
    </>
  );
}

type toggleBtnProps = {
  isOpen?: boolean;
  onClick?: () => void;
}

function ToggleBtn({ isOpen , onClick } : toggleBtnProps) {
  return <button className="btn-toggle">{isOpen ? "-" : "+"}</button>;
}

function Content() {
  const [movies, setMovies] = useState<tempMovieDataType[]>(tempMovieData);
  const [watchedmovies, setWatchedMovies] = useState<tempWatchedDataType[]>(tempWatchedData);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const avgImdbRating:number = average(
    tempWatchedData.map((movie:tempWatchedDataType) => movie.imdbRating)
  );
  const avgUserRating:number = average(
    tempWatchedData.map((movie:tempWatchedDataType) => movie.userRating)
  );
  const avgRuntime :number = average(tempWatchedData.map((movie:tempWatchedDataType) => movie.runtime));

  return (
    <main className="main">
      <div className="box">
        <ToggleBtn
          isOpen={isOpen}
          onClick={() => setIsOpen((open:boolean) => !open)}
        ></ToggleBtn>
        {isOpen && (
          <ul className="list">
            {movies.length > 0 ? (
              movies.map((movie:tempMovieDataType) => (
                <li>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
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
      </div>

      <div className="box">
        <ToggleBtn></ToggleBtn>
        <>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{watchedmovies.length} movies</span>
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

          <ul className="list">
            {watchedmovies.map((movie:tempWatchedDataType) => (
              <li>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
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
                </div>
              </li>
            ))}
          </ul>
        </>
      </div>
    </main>
  );
}
