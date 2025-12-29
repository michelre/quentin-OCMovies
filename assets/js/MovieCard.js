class MovieCard {
    constructor(id, title, image, onClick){
        this.id = id
        this.title = title
        this.image = image
        this.onClick = onClick
    }

    render(){
        const movieCard = document.createElement('div')
        movieCard.classList.add('movie-card')

        const movieCardImage = document.createElement('img')
        movieCardImage.id = 'movie1-image'
        movieCardImage.src = this.image
        movieCardImage.alt = `Affiche du film ${this.title}`


        const movieCardDetails = document.createElement('div')
        movieCardDetails.classList.add('movie-card-details')

        const movieCardTitle = document.createElement('h3')
        movieCardTitle.id = 'movie-title'
        movieCardTitle.innerText = this.title

        const movieCardButton = document.createElement('button')
        movieCardButton.innerText = 'Details'

        movieCardDetails.appendChild(movieCardTitle)
        movieCardDetails.appendChild(movieCardButton)
        
        movieCard.appendChild(movieCardImage)
        movieCard.appendChild(movieCardDetails)

        movieCardButton.addEventListener('click', () => {
            this.onClick(this.id)
        })

        return movieCard
    }
}

export default MovieCard