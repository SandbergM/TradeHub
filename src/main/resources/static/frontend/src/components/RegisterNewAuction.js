import React, { useState, useEffect } from 'react'
import { Input, Label, Form, Button } from "reactstrap";
import ImagePreview from './ImagePreview'
import { 
    timestampToMonth, 
    timestampToDay, 
    timestampConverter, 
    timestampToHourAndMinutes 
} from '../utils/timestampConversion'

const RegisterNewAuction = () => {

    const [auction, setAuction] = useState({});
    const [images, setImages] = useState([]);
    const [primaryPickIndex, setPrimaryPickIndex] = useState( 0 )
    const auctionDurationInterval = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // Days

    const addImages = (files) => {
        if( images.length > 4 ) return;
        let tempArr = [];

        for(let el of Object.entries(files)){
            tempArr.push(el[1])
            if( ( images.length + tempArr.length ) === 4 ) break;
        }
        setImages([...images, ...tempArr])
    }

    const removeImage = (file, index) => {

        if( index === primaryPickIndex ){ setPrimaryPickIndex( 0 ) }
        if( index < primaryPickIndex ){ setPrimaryPickIndex(primaryPickIndex - 1) }

        setImages( images.filter( (el) => {
            return el !== file
        }))
        
    }

    const customImageUploadTrigger = () => {
        document.getElementById("register-auction-files").click()
    }

    const uploadImages = async () => {

        let tempArr = images;

        let placeholderObj = tempArr[primaryPickIndex];
        tempArr[primaryPickIndex] = tempArr[0];
        tempArr[0] = placeholderObj;

        let formData = new FormData();
        if (!images.length) return;
        Object.entries(tempArr).map((x) => {
            formData.append("files", x[1]);
        });
    
        let response = await fetch("/static/uploads", {
            method: "POST",
            body: formData,
        }).catch(console.warn);
        return  await response.json();
    }

    const submitAuction = async (e) => {
        e.preventDefault()

        if(!auction.timestamp){
            auction.timestamp = timestampConverter(3);
        }

        if(!auction.title || !auction.description || !auction.price || !images.length){ return }

        let response = await fetch('/api/v1/auctions',{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({...auction, images : await uploadImages()}),
        }).catch(console.warn);
        response = await response.json();
        document.getElementById("register-auction-form").reset()
        setAuction({})
        setImages([])
    }

    const displayDay = (days) => {
        let date = new Date();
        date.setDate(date.getDate() + days)
        return `${days} Dagar - ${timestampToDay(date)} ${date.getDate()} ${timestampToMonth(date)} kl ${timestampToHourAndMinutes(date)}`
    }

    return(
        <Form id="register-auction-form" onSubmit={submitAuction}>

            <div className="col-12 light-grey-background pt-4 pb-4 pl-3 pr-3 bold tradeHub-dark-grey">

                    <Label 
                        type="text"
                        className="register-auction-label mt-4 pl-2" 
                        for="register-auction-title">Rubrik</Label>
                    <Input 
                        required
                        id="register-auction-title" 
                        className="col-12 register-auction-input pl-2" 
                        onChange={(e) => { setAuction({...auction, title : e.target.value}) }} 
                    />

                    <Label 
                        className="register-auction-label mt-4 pl-2" 
                        for="register-auction-description">Beskrivning</Label>
                    <textarea 
                        required
                        rows="10"
                        id="register-auction-description"
                        className="col-12 register-auction-input pl-2" 
                        onChange={(e) => { setAuction({...auction, description : e.target.value}) }} 
                    />

                    <Label 
                        className="register-auction-label mt-4 pl-2" 
                        for="register-auction-price">Utropspris</Label>
                    <Input
                        required
                        type="number" 
                        min="0"
                        id="register-auction-price"
                        className="col-12 register-auction-input pl-2" 
                        onChange={(e) => { setAuction({...auction, price : e.target.value}) }} 
                    />

                    <Label 
                        className="register-auction-label mt-4 pl-2" 
                        for="register-auction-duration">Annonslängd</Label>
                    <Input
                        type="select"
                        id="register-auction-duration"
                        className="col-12 register-auction-input pl-2" 
                        onChange={(e) => { setAuction({...auction, timestamp : e.target.value}) }} 
                    >
                        
                        { auctionDurationInterval.map( (value, index) => {
                            return (<option key={index} value={ timestampConverter(value) }> { displayDay(value) } </option>)
                        }) }

                    </Input>

                    <Button 
                        className="col-12 mt-4 mb-4" 
                        disabled={ images.length >= 4 }
                        onClick={() => { customImageUploadTrigger() }}
                    > Lägg till bilder ( {images.length} av 4 ) 
                    </Button>

                    <Input
                        type="file"
                        name="file"
                        id="register-auction-files"
                        required
                        multiple="multiple"
                        accept=".png,.jpg,.jpeg,.gif,.bmp,.jfif"    
                        onChange={(e) => addImages(e.target.files)}
                    />

                    { images.length !== 0 && 
                    <div className="row ">
                        <div className="col-12 tradeHub-dark-grey text-center"> 
                            <p> Tryck på den bild du vill ha som framsida för annonsen </p>
                        </div>

                        { images.map((val, index) => {
                                return <div className="col-6 col-md-6 col-lg-6 register-auction-image-item mt-2 justify-content-center" key={index} > 
                                            <ImagePreview 
                                                image={ val } 
                                                removeImage={ removeImage } 
                                                index={ index }
                                                setPrimaryPickIndex={ setPrimaryPickIndex }
                                                isPrimary={ primaryPickIndex === index }
                                            />
                                        </div>
                            }) }
                            
                    </div>
                    }

                <Button className="col-12 mt-4"> Lägg upp auktion </Button>

            </div>
        </Form>
    )

}

export default RegisterNewAuction