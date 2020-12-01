import React from 'react'

const ImagePreview = (props) => {

    return(
        <div 
        className="mb-3 mt-3 image-preview-main-container d-flex justify-content-center align-items-center" 
        
        >

            <span 
            className="material-icons image-preview-delete pointer" 
            onClick={() => { props.removeImage( props.image, props.index ) }} >remove_circle
            </span>

            <img 
            src={URL.createObjectURL(props.image)} 
            className=" image-preview-img pointer"
            onClick={() => { props.setPrimaryPickIndex(props.index) }}
            />

            { props.isPrimary &&
            
            <span 
            className="material-icons image-preview-primary" 
            >stars
            </span>

            }

        </div>
    )

}

export default ImagePreview