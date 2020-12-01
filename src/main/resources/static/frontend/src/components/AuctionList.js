import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import AuctionItem from "../components/AuctionItem";

const AuctionList = (props) => {
  const [auctions, setAuctions] = useState([]);
  const [displayLoader, setDisplayLoader] = useState( true );

  useEffect(() => {
    fetchAuctions();
  },[props.fetch]);

  const fetchAuctions = async () => {
    setAuctions([])
    setDisplayLoader(true)
    let res = await fetch("/api/v1/auctions" + props.fetch);
    
    try {
      if(res.status === 200){
        res = await res.json();
        setAuctions(res);
      }
      else{
        
      }
     
    } catch {
      console.error("could not fetch auctions");
    }
    setDisplayLoader(false)
  };

  return (
    <div>
      <Row xs={props.xs} sm={props.sm} md={props.md}>

        { displayLoader && <div id="loader"></div> }
        { !displayLoader && auctions.length === 0 && 
          <div id="no-matches-found" className="tradeHub-orange bold"> Din sökning matchade inte någon annons. </div> 
        }
        {auctions.map((auction, i) => {
          return <AuctionItem auction={auction} key={i} />;
        })}
      </Row>
    </div>
  );
};
export default AuctionList;
