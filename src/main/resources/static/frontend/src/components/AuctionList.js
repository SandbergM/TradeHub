import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import AuctionItem from "../components/AuctionItem";
import tuttiPrutti from "../images/346095.png";
import SearchField from "./searchField";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    const loader = document.getElementById("loader");
    let res = await fetch("/api/v1/auctions");
    try {
      res = await res.json();
      setAuctions(res);
      loader.classList.add("hidden");
    } catch {
      console.error("could not fetch auctions");
    }
  };

  return (
    <div>
      <SearchField />
      <div id="loader"></div>
      <Row xs="1" sm="2" md="3">
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
