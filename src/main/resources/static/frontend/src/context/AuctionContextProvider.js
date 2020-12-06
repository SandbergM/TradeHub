import React, { useContext, createContext, useState } from "react";
export const AuctionContext = createContext();

const AuctionContextProvider = (props) => {
  const [activeAuction, setActiveAuction] = useState(null)
  const [highestBid, setHighestBid] = useState();

  const values = {
    activeAuction,
    setActiveAuction,
    setHighestBid,
    highestBid
  };

  return (
    <AuctionContext.Provider value={values}>
      {props.children}
    </AuctionContext.Provider>
  );
};

export default AuctionContextProvider;
