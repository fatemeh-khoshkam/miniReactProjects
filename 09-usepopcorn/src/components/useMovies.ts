import { useEffect, useState } from "react";
import {tempMovieDataType} from "../types";

const KEY:string = "6487f592";

export function useMovies(query: string , callback: () => void) {
    const [error,setError] = useState<string>("");
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<tempMovieDataType[]>([]);

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
        callback?.()
        fetchMovies();

        return function (){
            controller.abort();
        }

    },[query])

    return { movies , error , isLoading }
}