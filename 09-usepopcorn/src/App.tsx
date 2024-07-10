import {useEffect, useState} from "react";
import  { tempMovieDataType, tempWatchedDataType } from './types';
import Nav from "./components/Nav";
import MovieList from "./components/MovieList";
import WatchedMoviesList from './components/WatchedMoviesList'
import WatchedSummary from "./components/WatchedSummary";
import Loader from "./components/Loader";
import MovieDetails from "./components/MovieDetails";
import Box from "./components/Box";
import { useMovies } from "./components/useMovies";

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
  const [watchedMovies, setWatchedMovies] = useState<tempWatchedDataType[]>(function(){
    const savedMovies: string | null = localStorage.getItem('watchedMovies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  const { movies , error , isLoading } = useMovies(query,handleCloseMovie)
  const [selectedMovieId, setSelectedMovieId] = useState<string>('');

  function handleSelectMovie(id:string):void {
    setSelectedMovieId((selectedId) => (id === selectedId ? '' : id));
    // const newSelectedId = (id === selectedMovieId ? '' : id);
    // console.log(newSelectedId); // Log the new selected ID
  }

  function handleCloseMovie ():void {
    setSelectedMovieId("");
  }

  function handleAddWatched(movie:tempWatchedDataType):void {
    setWatchedMovies(watchedMovies => [...watchedMovies, movie])
  }

  function handleDeleteWatchedMovie(id:string):void {
    setWatchedMovies(watchedMovies => watchedMovies.filter((movie:tempWatchedDataType) => movie.imdbID !== id))
  }





  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  }, [watchedMovies]);

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


