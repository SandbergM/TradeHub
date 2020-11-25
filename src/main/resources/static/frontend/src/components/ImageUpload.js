import React, { useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

const ImageUpload = () => {
    const [images, setImages] = useState([]);
    const uploadImages = async () => {
    
        let formData = new FormData();
        if (!images.length) return;
        Object.entries(images).map((x) => {
            formData.append("files", x[1]);
            console.log(x);
        });
    
        let response = await fetch("/static/upload", {
            method: "POST",
            body: formData,
        }).catch(console.warn);
        response = await response.json();
    }
    
    const addImages = (files) => {
        if( images.length > 5 ) return;
        let remainingUploads = 5 - images.length;
        let tempArr = [];

        for(let el of Object.entries(files)){
            if(remainingUploads === 0)break;
            tempArr.push(el[1])
            remainingUploads--;
        }
        setImages([...images, ...tempArr])
    }
    
    const pickPrimary = (file) => {
        let tempArr = images;
        tempArr.splice( 0, 0, tempArr.splice(images.indexOf(file), 1)[0])
        setImages(tempArr)
    }

    return(
        <div>
            <FormGroup className="container mb-4">
                <div className="row dateInputRow">
                <Label for="files">File to upload:</Label>
                <Input
                    type="file"
                    name="file"
                    id="files"
                    required
                    multiple="multiple"
                    accept=".png,.jpg,.jpeg,.gif,.bmp,.jfif"    
                    onChange={(e) => addImages(e.target.files)}
                    />
                </div>
                <Button onClick={() => uploadImages()} > Upload images </Button>
            </FormGroup>
            <ul>
                { images.map((val, index) => {
                    console.log('test');
                    return <li key={index} onClick={() => { pickPrimary(val) }}> {val.name} </li>
                }) }
            </ul>
        </div>
    )
}

export default ImageUpload;