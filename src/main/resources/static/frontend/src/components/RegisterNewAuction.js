import React, { useState } from 'react'
import { Input, Label, Form, Button, FormGroup } from "reactstrap";

const RegisterNewAuction = () => {

    const [auction, setAuction] = useState({});
    const [images, setImages] = useState([]);
    const auctionDurationInterval = [2, 4, 6, 7];

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

    const customImageUploadTrigger = () => {
        document.getElementById("register-auction-files").click()
    }
    
    const pickPrimary = (file) => {
        let tempArr = images;
        tempArr.splice( 0, 0, tempArr.splice(images.indexOf(file), 1)[0])
        setImages(tempArr)
    }

    const uploadImages = async () => {

        let formData = new FormData();
        if (!images.length) return;
        Object.entries(images).map((x) => {
            formData.append("files", x[1]);
            console.log(x);
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

        let x = await uploadImages();

        console.log(x);

        let response = await fetch('/api/v1/auctions',{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({...auction, images : x}),
        }).catch(console.warn);

        response = await response.json();
        console.log(response);

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
                        rows="10" 
                        type="select"
                        id="register-auction-duration"
                        className="col-12 register-auction-input pl-2" 
                        onChange={(e) => { setAuction({...auction, timestamp : e.target.value}) }} 
                    >
                        
                        { auctionDurationInterval.map( (value, index) => {
                            return (<option key={index} value={value}> { displayDay(value) } </option>)
                        }) }
                    </Input>
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
                                return <li className="register-auction-image-item" key={index} onClick={() => { pickPrimary(val) }}> {val.name} </li>
                        }) }
                    </ul>
                <Button className="col-12" onClick={() => { customImageUploadTrigger() }}> Ladda upp bilder ( {images.length} av 5 ) </Button>
                <Button className="col-12" onClick={() => { submitAuction() }}> Lägg upp auktion </Button>
            </div>
        </Form>
    )

}

export default RegisterNewAuction