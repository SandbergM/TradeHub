import React, { useContext, createContext, useState } from "react";
export const AuctionContext = createContext();

const AuctionContextProvider = (props) => {
  const [activeAuction, setActiveAuction] = useState({});

  const values = {
    activeAuction,
    setActiveAuction,
  };

  return (
    <AuctionContext.Provider value={values}>
      {props.children}
    </AuctionContext.Provider>
  );
};

export default AuctionContextProvider;
