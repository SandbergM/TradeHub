import imageMissing from '../images/bild_saknas.png'

export const getThumbNail = (images) => {

    if( !images || !images[0] ){
        return imageMissing ;
    }

    images.forEach( (image) => {
        if(image.primary) return image.url
    })

    return `http://localhost:8080${images[0].url}`

}

export const sortImagesAfterPriority = (images) => {
    // TODO
}