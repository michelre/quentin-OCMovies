export default class Select {
    constructor(genres, onSelect){
        this.genres = genres
        this.onSelect = onSelect
        this.initOptions()
        this.initEvents()
    }

    initOptions(){
        const options = document.querySelector('.select-container .options')        
        const selectedText = document.querySelector('.select-container .category-selected')

        const optionsList = []

        this.genres.forEach((genre, idx) => {
            const option = document.createElement('li')
            option.classList.add('option')
            const selectContainer = document.querySelector('.select-container')
            

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
                selectedText.innerText = genre.name                                
                this.onSelect(genre.name)       
                setTimeout(() => {
                    selectContainer.classList.remove('open')
                }, 0)         
            })

            if(idx === 0){
                const firstGenre = this.genres[0]  
                option.classList.add('selected')                
                selectedText.innerText = firstGenre.name
                this.onSelect(firstGenre.name)
            }
        })
    }

    initEvents(){
        const selectContainer = document.querySelector('.select-container')
        selectContainer.addEventListener("click", () => {
            selectContainer.classList.toggle('open')
        })
    }

    closeSelect(){
        const selectContainer = document.querySelector('.select-container')
        selectContainer.classList.remove('open')
    }
}