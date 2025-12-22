import MovieCard from './MovieCard.js'
import { getBestMovies, getGenres, getMoviesByGenre } from './api.js'

const displayMovieCards = (movies, container) => {
    movies.forEach(movie => {
        const movieCard = new MovieCard(movie.title, movie.image_url)            
        container.appendChild(movieCard.render())
    });
}

const displayMoviesByGenre = async (genre) => {
    const movieContainer = document.querySelector('#other-category-2 .movies-container')
    movieContainer.innerHTML = ''
    const moviesByGenre = await getMoviesByGenre(genre)
    displayMovieCards(moviesByGenre, movieContainer)
}

async function main(){
    const movies = await getBestMovies()
    displayMovieCards(movies, document.querySelector('.movies-container'))

    const moviesMystery = await getMoviesByGenre('Mystery')
    displayMovieCards(moviesMystery, document.querySelector('#category-1 .movies-container'))

    const genres = await getGenres()
    const select = document.querySelector('#other-category-2-select')
    genres.forEach((genre, idx) => {
        const option = document.createElement('option')
        option.value = genre.name
        option.innerText = genre.name
        select.appendChild(option)
        if(idx === 0){
            option.selected = true
        }
        
    })

    select.addEventListener('change', async (e) => {                
        displayMoviesByGenre(e.target.value)
    })

    displayMoviesByGenre(genres[0].name)
}

main()