import React, { createContext, useState, useEffect }  from "react";
import { Col, Row } from "reactstrap";
import AuctionItem from "../components/AuctionItem";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([])

  useEffect(() => {
   fetchAuctions()
  },[])

  const fetchAuctions = async ()=>{
    let res = await fetch("/api/v1/auctions");
    try {
      res = await res.json();
      console.log(res);
      setAuctions(res);
    } catch {
      console.error("could not fetch auctions");
    }
  }


  return (
    <Row xs="1" sm="2" md="3">
        {auctions.map((auction, i) => {
            return (
            <AuctionItem
            key = {i}
            title = {auction.title}
            description = {auction.description}
            image = "https://balstaauktionshall.nu/images/custom/ProductTemplate/133359.jpg"
            timer = {auction.timestamp}
            ></AuctionItem>
            ) 
        })}
    </Row>
  );
};
export default AuctionList;
