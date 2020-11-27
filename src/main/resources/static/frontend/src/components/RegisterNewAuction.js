import React, { useState } from 'react'
import { Input, Label, Form, Button } from "reactstrap";
import { 
    timestampToMonth, 
    timestampToDay, 
    timestampConverter, 
    timestampToHourAndMinutes 
} from '../utils/timestampConversion'

const RegisterNewAuction = () => {

    const [auction, setAuction] = useState({});
    const [images, setImages] = useState([]);
    const auctionDurationInterval = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // Days

    const addImages = (files) => {
        if( images.length > 5 ) return;
        let tempArr = [];

        for(let el of Object.entries(files)){
            tempArr.push(el[1])
            if( ( images.length + tempArr.length ) === 5 ) break;
        }
        setImages([...images, ...tempArr])
    }

    const removeImage = (file) => {
        setImages( images.filter( (el) => {
            return el !== file
        }))
    }

    const customImageUploadTrigger = () => {
        document.getElementById("register-auction-files").click()
    }
    
    const pickPrimary = (val) => {
        let tempArr = images;
        let index = 0;
        for(let i = 0 ; i < tempArr.length ; i++ ){
            if(val === tempArr[i]["name"]){
                index = i;
                break;
            }
        }
        tempArr.splice( 0, 0, tempArr.splice(index, 1)[0])
        setImages(tempArr)
    }

    const uploadImages = async () => {

        let formData = new FormData();
        if (!images.length) return;
        Object.entries(images).map((x) => {
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

                    <Button className="col-12 mt-4 mb-4" onClick={() => { customImageUploadTrigger() }}> Ladda upp bilder ( {images.length} av 5 ) </Button>

                    <Input
                        type="file"
                        name="file"
                        id="register-auction-files"
                        required
                        multiple="multiple"
                        accept=".png,.jpg,.jpeg,.gif,.bmp,.jfif"    
                        onChange={(e) => addImages(e.target.files)}
                    />

                    <ul className="register-auction-image-list">
                        { images.map((val, index) => {
                             return <li className="row register-auction-image-item mt-2" key={index} > 
                                        <p className="col-9"> {val.name} </p> 
                                        <div className="col-3 text-right" onClick={ () => { removeImage(val) } }>
                                            <span className="material-icons">delete</span>
                                        </div>
                                    </li>
                        }) }
                    </ul>

                    <Input
                        type="select"
                        id="register-auction-primary-image"
                        className="col-12 register-auction-input mt-3 mb-3" 
                        onChange={(e) => { pickPrimary(e.target.value) }} 
                    >
                        <option defaultValue> Välj thumbnail </option>
                        { images.map( (value, index) => {
                            return (<option key={index} value={value.name}> { value.name } </option>)
                        }) }
                    </Input>

                <Button className="col-12 mt-4"> Lägg upp auktion </Button>

            </div>
        </Form>
    )

}

export default RegisterNewAuction