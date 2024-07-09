import {useEffect, useState} from "react";
import  { tempMovieDataType, tempWatchedDataType } from './types';
import Nav from "./components/Nav";
import MovieList from "./components/MovieList";
import WatchedMoviesList from './components/WatchedMoviesList'
import WatchedSummary from "./components/WatchedSummary";
import Loader from "./components/Loader";
import MovieDetails from "./components/MovieDetails";
import Box from "./components/Box";

// const tempMovieData:tempMovieDataType[] = [
//   // {
//   //   imdbID: "tt1375666",
//   //   Title: "Inception",
//   //   Year: "2010",
//   //   Poster:
//   //     "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   // },
//   // {
//   //   imdbID: "tt0133093",
//   //   Title: "The Matrix",
//   //   Year: "1999",
//   //   Poster:
//   //     "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   // },
//   // {
//   //   imdbID: "tt6751668",
//   //   Title: "Parasite",
//   //   Year: "2019",
//   //   Poster:
//   //     "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   // },
// ];
//
// const tempWatchedData:tempWatchedDataType[] = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const KEY:string = "6487f592";

export default function App() {
  const [query, setQuery] = useState<string>('');

  return (
    <>
      <Nav query={query} onSetQuery={setQuery}></Nav>
      <Content query={query} onSetQuery={setQuery}></Content>
    </>
  );
}

function Content({query , onSetQuery }: {query: string , onSetQuery: (query: string) => void }) {
  const [movies, setMovies] = useState<tempMovieDataType[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<tempWatchedDataType[]>([]);
  const [error,setError] = useState<string>("");
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string>('');

  function handleSelectMovie(id:string):void {
    setSelectedMovieId((selectedId) => (id === selectedId ? '' : id));
    // const newSelectedId = (id === selectedMovieId ? '' : id);
    // console.log(newSelectedId); // Log the new selected ID
  }

  type searchResponse = {
    Response: string,
    Search: tempMovieDataType[],
    totalResults?: number,
  }

  useEffect(function(){
    const controller:AbortController = new AbortController();

    async function fetchMovies (){
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${KEY}` , {signal: controller.signal});
        if(!res.ok) throw new Error(`Could not fetch movies`);

        const data:searchResponse = await res.json();
        if(data.Response === 'False') throw new Error("Movie not found");
        console.log(data)
        setMovies(data.Search);
        setError('');
      }
      catch (err){
        if (err instanceof TypeError) {
          setError('🌐 Please check your internet connection.');
        } else if (err instanceof Error) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } else {
          setError('An unknown error occurred.');
        }
      }
      finally {
        setIsLoading(false)
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    handleCloseMovie()
    fetchMovies();

    return function (){
      controller.abort();
    }

  },[query])

  const handleCloseMovie = ():void => {
    setSelectedMovieId("");

  }

  function handleAddWatched(movie:tempWatchedDataType):void {
    setWatchedMovies(watchedMovies => [...watchedMovies, movie])
  }

  function handleDeleteWatchedMovie(id:string):void {
    setWatchedMovies(watchedMovies => watchedMovies.filter((movie:tempWatchedDataType) => movie.imdbID !== id))
  }

  return (
    <main className="main">
      <Box>
        {error && <ReportError message={error}></ReportError>}
        {isLoading && <Loader></Loader>}
        {!error && !isLoading && <MovieList handleSelectMovie={handleSelectMovie} movies={movies}></MovieList>}
      </Box>
      <Box>
        {
          selectedMovieId ?
            <MovieDetails
                selectedId={selectedMovieId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watchedMovies}
            ></MovieDetails>
            :
            <>
              <WatchedSummary watchedMovies={watchedMovies}></WatchedSummary>
              <WatchedMoviesList watchedMovies={watchedMovies} deleteMovie={handleDeleteWatchedMovie}></WatchedMoviesList>
            </>
        }
      </Box>
    </main>
  );
}

const ReportError = ({message} : { message:string }) =>{
  return (
      <p className="error">
        <span>⛔️</span> {message}
      </p>
  );
}


