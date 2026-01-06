import MovieCard from './MovieCard.js'
import { getBestMovies, getGenres, getMoviesByGenre, getMovieDetails, getBestMovie } from './api.js'
import { showImage } from './utils.js'

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
    showImage(movieDesktopImage, movieDetails.image_url, movieDetails.title)

    const movieMobileImage = document.querySelector('.movie-mobile-image')
    movieMobileImage.src = movieDetails.image_url
    movieMobileImage.alt = movieDetails.title

    modal.classList.toggle('show')
}

const displayBestMovie = (movie) => {
    const movieContainer = document.querySelector('#best-movie .movie')
    const img = movieContainer.querySelector('img')
    const title = movieContainer.querySelector("#best-movie-title")
    const description = movieContainer.querySelector('#best-movie-summary')
    const button = movieContainer.querySelector('#best-movie-details')

    title.innerText = movie.title
    description.innerText = movie.description

    showImage(img, movie.image_url, movie.title)

    button.addEventListener('click', () => {
        displayMovieDetail(movie.id)
    })
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

const seeMore = () => {
    const buttons = document.querySelectorAll('.see-more')
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const moviesContainer = btn.parentElement.querySelector('.movies-container')
            moviesContainer.style.height = 'auto'
            btn.style.display = 'none'
        })
    })
}

async function main(){
    const bestMovie = await getBestMovie()    
    displayBestMovie(await getMovieDetails(bestMovie.id))


    const movies = await getBestMovies()
    displayMovieCards(movies, document.querySelector('.movies-container'))

    const genreCategory1 = 'Sci-Fi'
    const moviesCategory1 = await getMoviesByGenre(genreCategory1)
    const sectionTitleCategory1 = document.querySelector('#category-1 h2')
    sectionTitleCategory1.innerText = genreCategory1
    displayMovieCards(moviesCategory1, document.querySelector('#category-1 .movies-container'))

    const genreCategory2 = 'Drama'
    const moviesCategory2 = await getMoviesByGenre(genreCategory2)
    const sectionTitleCategory2 = document.querySelector('#category-2 h2')
    sectionTitleCategory2.innerText = genreCategory2
    displayMovieCards(moviesCategory2, document.querySelector('#category-2 .movies-container'))

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

    seeMore()
}

main()