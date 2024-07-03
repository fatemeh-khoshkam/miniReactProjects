import { useState } from "react";
import  { tempMovieDataType, tempWatchedDataType } from './types';
import Nav from "./components/Nav";
import average from "./utils/average";
import ToggleBtn from "./components/ToggleBtn";
import SearchBox from "./components/SearchBox";
import WatchedMoviesList from './components/WatchedMoviesList'
import WatchedSummary from "./components/WatchedSummary";

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

const KEY:string = "6487f592";

export default function App() {
  return (
    <>
      <Nav></Nav>
      <Content></Content>
    </>
  );
}


function Content() {
  const [movies, setMovies] = useState<tempMovieDataType[]>(tempMovieData);
  const [watchedmovies, setWatchedmovies] = useState<tempWatchedDataType[]>(tempWatchedData);
  const [isOpen, setIsOpen] = useState<boolean>(true);


  const close = ():void => {
    setIsOpen((open:boolean) => !open);
  }

  return (
    <main className="main">

      <SearchBox onIsOpen={isOpen} movies={movies} onSetIsOpen={close}></SearchBox>

      <div className="box">
        <ToggleBtn></ToggleBtn>
        <>
          <WatchedSummary onWatchedMovies={watchedmovies}></WatchedSummary>

          <WatchedMoviesList onWatchedMovies={watchedmovies}></WatchedMoviesList>
        </>
      </div>
    </main>
  );
}
