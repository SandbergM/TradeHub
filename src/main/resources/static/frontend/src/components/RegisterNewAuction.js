import React, { useState, useEffect } from 'react'
import { Input, Label } from "reactstrap";

const RegisterNewAuction = () => {

    const [auction, setAuction] = useState({});
    const auctionDurationInterval = [2, 4, 6, 7];

    const submitAuction = () => {
    }

    const displayDay = (days) => {
        let date = new Date();
        date.setDate(date.getDate() + days)
        let weekDays = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return `${days} Days (Ends on ${weekDays[date.getDay()]} ${date.getDay()} ${months[date.getMonth()]})`
    }

    return(
        <div className="col-12 light-grey-background pt-4 pb-4 pl-3 pr-3 bold tradeHub-dark-grey">
            <div>
                <Label 
                    type="text"
                    className="register-auction-label mt-4 pl-2" 
                    for="register-auction-title">Title</Label>
                <Input 
                    required
                    id="register-auction-title" 
                    className="col-12 register-auction-input pl-2" 
                    placeholder="Title" 
                    onChange={(e) => { setAuction({...auction, ["title"] : e.target.value}) }} 
                />

                <Label 
                    className="register-auction-label mt-4 pl-2" 
                    for="register-auction-description">Description</Label>
                <textarea 
                    required
                    rows="10"
                    id="register-auction-description"
                    className="col-12 register-auction-input pl-2" 
                    placeholder="Description" 
                    onChange={(e) => { setAuction({...auction, ["description"] : e.target.value}) }} 
                />

                <Label 
                    className="register-auction-label mt-4 pl-2" 
                    for="register-auction-price">Starting price</Label>
                <Input
                    required
                    type="number" 
                    rows="10" 
                    id="register-auction-price"
                    className="col-12 register-auction-input pl-2" 
                    placeholder="Starting price" 
                    onChange={(e) => { setAuction({...auction, ["price"] : e.target.value}) }} 
                />

                <Label 
                    className="register-auction-label mt-4 pl-2" 
                    for="register-auction-duration">Acution Duration</Label>
                <Input
                    rows="10" 
                    type="select"
                    id="register-auction-duration"
                    className="col-12 register-auction-input pl-2" 
                    placeholder="Starting price" 
                    defaultValue={auctionDurationInterval[0]}
                    onChange={(e) => { setAuction({...auction, ["timestamp"] : e.target.value}) }} 
                >
                    
                    { auctionDurationInterval.map( (value, index) => {
                        return (<option key={index} value={value}> { displayDay(value) } </option>)
                    }) }

                </Input>
            </div>
        </div>
    )

}

export default RegisterNewAuction