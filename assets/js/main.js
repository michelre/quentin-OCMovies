import MovieCard from './MovieCard.js'
import { getBestMovies, getGenres, getMoviesByGenre, getMovieDetails } from './api.js'

const displayMovieDetail = async (id) => {
    const modal = document.querySelector('.modal')
    const movieDetails = await getMovieDetails(id)
    const movieTitle = document.querySelector('.movie-title')
    movieTitle.innerText = movieDetails.title

    const movieYear = document.querySelector('.movie-year')
    movieYear.innerText = movieDetails.year

    const movieGenre = document.querySelector('.movie-genre')
    movieGenre.innerText = movieDetails.genres.join(', ')

    const movieAge = document.querySelector('.movie-age')
    movieAge.innerText = movieDetails.rated

    const movieDuration = document.querySelector('.movie-duration')
    movieDuration.innerText = movieDetails.duration

    const movieCountry = document.querySelector('.movie-country')
    movieCountry.innerText = movieDetails.countries.join(' / ')


    const movieScore = document.querySelector('.movie-score')
    movieScore.innerText = movieDetails.imdb_score

    const movieGain = document.querySelector('.movie-gain')
    movieGain.innerText = movieDetails.worldwide_gross_income

    const movieRealisateur = document.querySelector('.movie-realisateur p')
    movieRealisateur.innerText = movieDetails.directors.join(', ')

    const movieSynopsis = document.querySelector('.movie-synopsis')
    movieSynopsis.innerText = movieDetails.long_description

    const movieCasting = document.querySelector('.movie-casting p')
    movieCasting.innerText = movieDetails.actors.join(', ')

    const movieDesktopImage = document.querySelector('.movie-desktop-image')
    movieDesktopImage.src = movieDetails.image_url
    movieDesktopImage.alt = movieDetails.title

    const movieMobileImage = document.querySelector('.movie-mobile-image')
    movieMobileImage.src = movieDetails.image_url
    movieMobileImage.alt = movieDetails.title

    modal.classList.toggle('show')
}

const displayMovieCards = (movies, container) => {
    movies.forEach(movie => {
        const movieCard = new MovieCard(movie.id, movie.title, movie.image_url, displayMovieDetail)            
        container.appendChild(movieCard.render())
    });
}

const displayMoviesByGenre = async (genre) => {
    const movieContainer = document.querySelector('#other-category .movies-container')
    movieContainer.innerHTML = ''
    const moviesByGenre = await getMoviesByGenre(genre)
    displayMovieCards(moviesByGenre, movieContainer)
}

const displayGenres = async () => {
    const genres = await getGenres()
    const select = document.querySelector('#other-category-select')
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

    return genres
}

const closeModal = () => {
    const modal = document.querySelector('.modal')
    modal.classList.remove('show')
}

async function main(){
    const movies = await getBestMovies()
    displayMovieCards(movies, document.querySelector('.movies-container'))

    const moviesMystery = await getMoviesByGenre('Mystery')
    displayMovieCards(moviesMystery, document.querySelector('#category-1 .movies-container'))

    const genres = await displayGenres()
    displayMoviesByGenre(genres[0].name)

    const modalButtons = document.querySelectorAll('.modal button')
    const modalBg = document.querySelector('.modal-bg')

    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal()
        })
    })

    modalBg.addEventListener('click', () => {
        closeModal()
    })

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape'){
            closeModal()
        }
    })
}

main()