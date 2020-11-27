import React, { useState, useEffect }  from "react";
import { Row } from "reactstrap";
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
              auction = {auction}
            ></AuctionItem>
            ) 
        })}
    </Row>
  );
};
export default AuctionList;
