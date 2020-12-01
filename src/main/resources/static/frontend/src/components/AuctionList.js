import React, { useState, useEffect }  from "react";
import { Row } from "reactstrap";
import AuctionItem from "../components/AuctionItem";
import SearchField from "./searchField";

const AuctionList = (props) => {
  const [auctions, setAuctions] = useState([])

  useEffect(() => {
   fetchAuctions()
  },[])

  const fetchAuctions = async ()=>{
    let res = await fetch("/api/v1/auctions"+props.fetch);
    try {
      res = await res.json();
      setAuctions(res);
    } catch {
      console.error("could not fetch auctions");
    }
  }

  return (
    <div>
    
    <Row xs={props.xs} sm={props.sm} md={props.md}>
        {auctions.map((auction, i) => {
            return (
              <AuctionItem
              auction = {auction}
              key={i}
              />

            ) 
        })}
    </Row>
    </div>
  );
};
export default AuctionList;
