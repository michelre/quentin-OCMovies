export const getBestMovies = async () => {
    const request = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=6')
    const movies = await request.json()
    return movies.results
}

export const getMoviesByGenre = async (genre) => {
    const request = await fetch(`http://localhost:8000/api/v1/titles/?page_size=6&genre=${genre}`)
    const movies = await request.json()
    return movies.results
}

export const getGenres = async () => {
    const request = await fetch(`http://localhost:8000/api/v1/genres?page_size=30`)
    const genres = await request.json()
    return genres.results
}