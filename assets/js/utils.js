export const showImage = (img, imgUrl, alt) => {
    img.src = imgUrl
    img.alt = alt
    const fallbackSrc = '/assets/images/default-movie.png'
    img.addEventListener('error', () => {
        img.src = fallbackSrc
        img.alt = `${alt} (image par défaut)`
    })
}