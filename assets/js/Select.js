export default class Select {
    constructor(genres, onSelect){
        this.genres = genres
        this.onSelect = onSelect
        this.initOptions()
        this.initEvents()
    }

    initOptions(){
        const options = document.querySelector('.select-container .options')
        const selected = document.querySelector('.select-container .selected')

        const optionsList = []

        this.genres.forEach((genre, idx) => {
            const option = document.createElement('li')
            option.classList.add('option')
            

            const title = document.createElement('span')
            title.innerText = genre.name
            option.appendChild(title)

            const img = document.createElement('img')
            img.src = 'assets/images/checkbox.png'
            img.alt = 'Checkbox'
            option.appendChild(img)

            options.appendChild(option)

            optionsList.push(option)

            option.addEventListener('click', () => {                                                

                optionsList.forEach(o => o.classList.remove('selected'))
                option.classList.add('selected')
                selected.innerText = genre.name
                options.classList.remove('open')
                this.onSelect(genre.name)
            })

            if(idx === 0){
                const firstGenre = this.genres[0]
                option.classList.add('selected')
                selected.innerText = firstGenre.name
                this.onSelect(firstGenre.name)
            }
        })
    }

    initEvents(){
        const selected = document.querySelector('.select-container .selected')
        const options = document.querySelector('.select-container .options')
        selected.addEventListener("click", () => {
            options.classList.toggle('open')
        })
    }
}