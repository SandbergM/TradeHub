import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuctionContext } from "../context/AuctionContextProvider";
import AuctionDetailsPageData from "../components/AuctionDetailsPageData";

const AuctionDetailsPage = () => {
  const { activeAuction, setActiveAuction } = useContext(AuctionContext)
  const [bid, setBid] = useState(0);

  let { id } = useParams();
    const getAuction = async () => {
        if(activeAuction.id == null){
        let auction = await fetch("/api/v1/auctions/" + id)
        auction = await auction.json()
        console.log(auction);
        setActiveAuction(auction)
      }
    }
    useEffect(() => {
      getAuction()
    },[])

    const postBid = async () => {
      console.log(bid);
      console.log(activeAuction.id);
      // /api/v1/auctions/{id}/{bid}
     let response= await fetch(`/api/v1/auctions/${activeAuction.id}/${bid}`,{
        method: "POST"
      }      )
      console.log(response);
    }

  return <AuctionDetailsPageData 
  activeAuction={activeAuction}
  bid={bid}
  setBid={setBid}
  postBid={postBid}
  />;
}

export default AuctionDetailsPage