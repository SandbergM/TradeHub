import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuctionContext } from "../context/AuctionContextProvider";
import { SocketContext } from "../context/SocketContext";
import AuctionDetailsPageData from "../components/AuctionDetailsPageData";

const AuctionDetailsPage = () => {
  const { activeAuction, setActiveAuction } = useContext(AuctionContext);
  const { sendMessage } = useContext(SocketContext);
  const [showErrorMessage, setShowErrorMessage] = useState(0);
  const [bid, setBid] = useState(0);
  const [acceptedBid, setAcceptedBid] = useState(0);

  let { id } = useParams();
  const getAuction = async () => {
    if (activeAuction.id == null) {
      let auction = await fetch("/api/v1/auctions/" + id);
      auction = await auction.json();
      console.log(auction);
      setActiveAuction(auction[0]);
    }
  };
  useEffect(() => {
    sendMessage({
      action: "join-room",
      payload: { roomId: activeAuction.id },
    });
    getAuction();

    return () => {
      sendMessage({
        action: "leave-room",
        payload: { roomId: activeAuction.id },
      });
    };
  }, []);

  const postBid = async () => {
    sendMessage({
      action: "bid",
      payload: {
        bid: bid,
        bidderId: activeAuction.bidder === null ? "" : activeAuction.bidder.id,
        auctionId: activeAuction.id,
      },
    });

    //  let response= await fetch(`/api/v1/auctions/${activeAuction.id}/${bid}`,{
    //     method: "POST"
    //   })
    //   console.log(response);
    //   if(response.status=== 400 ){
    //     //Too low
    //     setShowErrorMessage(1);
    //   }
    //   else if(response.status === 405){
    //     //No bid
    //     setShowErrorMessage(2)
    //   }
    //   else if(response.status === 204){
    //     //No error
    //     setShowErrorMessage(0);
    //     setAcceptedBid(bid)
    //   }
  };

  return (
    <AuctionDetailsPageData
      activeAuction={activeAuction}
      bid={bid}
      setBid={setBid}
      postBid={postBid}
      showErrorMessage={showErrorMessage}
      acceptedBid={acceptedBid}
    />
  );
};

export default AuctionDetailsPage;
