import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Button,
} from "reactstrap";
import { AuctionContext } from "../context/AuctionContextProvider";
import AuctionDetailsPageData from "./AuctionDetailsPageData";

const AuctionDetailsPage = () => {
  const { activeAuction, setActiveAuction } = useContext(AuctionContext)
  const [bid, setBid] = useState(0);

  let { id } = useParams();
    const getAuction = async () => {
        if(activeAuction.id == null){
        let auction = await fetch("/api/v1/auctions/" + id)
        auction = await auction.json()
        setActiveAuction(auction)
      }
    }
    useEffect(() => {
      getAuction()
    },[])

    const postBid = () => {
      // /api/v1/auctions/{id}/{bid}
    }

  return <AuctionDetailsPageData 
  activeAuction={activeAuction}
  bid={bid}
  setBid={setBid}
  />;
}


export default AuctionDetailsPage