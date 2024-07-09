type tempMovieDataType = {
    imdbID: string,
    Title: string,
    Year: string,
    Poster: string,
}

type tempWatchedDataType = {
    imdbID: string,
    Title: string,
    Year: string,
    Poster: string,
    runtime: number,
    imdbRating: number,
    userRating: number | null,
}

export { tempMovieDataType, tempWatchedDataType };