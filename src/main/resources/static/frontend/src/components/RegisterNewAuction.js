import React, { useState, useEffect } from 'react'
import { Input, Label, Form, Button, FormGroup } from "reactstrap";

const RegisterNewAuction = () => {

    const [auction, setAuction] = useState({});
    const [images, setImages] = useState([]);
    const auctionDurationInterval = [2, 4, 6, 7]; // Days

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

    const removeImage = (file) => {
        setImages( images.filter( (el) => {
            return el !== file
        }))
    }

    const customImageUploadTrigger = () => {
        document.getElementById("register-auction-files").click()
    }
    
    const pickPrimary = (index) => {
        let tempArr = images;
        tempArr.splice( 0, 0, tempArr.splice(index, 1)[0])
        setImages(tempArr)
        console.log(tempArr);
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

    const submitAuction = async () => {
        if(!auction.timestamp){
            auction.timestamp = new Date().setDate(new Date().getDate() + 2);
        }

        let response = await fetch('/api/v1/auctions',{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({...auction, images : await uploadImages()}),
        }).catch(console.warn);
        response = await response.json();
        //document.getElementById("register-auction-form").reset()
        //setAuction({})
    }

    const displayDay = (days) => {
        let date = new Date();
        date.setDate(date.getDate() + days)
        let weekDays = ["Sön","Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];
        let months = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
        return `${days} Dagar ( Avslutas ${weekDays[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} )`
    }

    return(
        <Form id="register-auction-form">
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
                        rows="10" 
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
                            return (<option key={index} value={value}> { displayDay(value) } </option>)
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
                            return (<option key={index} value={index}> { value.name } </option>)
                        }) }
                    </Input>

                <Button className="col-12 mt-4" onClick={() => { submitAuction() }}> Lägg upp auktion </Button>

            </div>
        </Form>
    )

}

export default RegisterNewAuction