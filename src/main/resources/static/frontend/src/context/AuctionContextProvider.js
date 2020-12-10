import React, { createContext, useState, useEffect } from "react";
export const AuctionContext = createContext();

const AuctionContextProvider = (props) => {
  const [activeAuction, setActiveAuction] = useState(null);
  const [auctions, setAuctions] = useState([]);
  const [highestBid, setHighestBid] = useState();
  const [hasMore, setHasMore] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [myAuctions, setMyAuctions] = useState([]);
  const [myBids, setMyBids] = useState([]);

  const auctionSearch = async (query) => {
    setDisplayLoader(true);
    let res = await fetch(`/api/v1/auctions${query}`);
    try {
      if (res.status === 200) {
        res = await res.json();
        setAuctions([...auctions, ...res]);
        setHasMore(res.length === 15);
        setDisplayLoader(false);
      } else {
        setAuctions([]);
        setDisplayLoader(false);
      }
    } catch {}
  };

  const fetchMyAuctionsHistory = async () => {
    let res = await fetch(`/api/v1/auctions/myPostedAuctions`);
    try {
      if (res.status === 200) {
        res = await res.json();
        setMyAuctions(res);
      } else {
      }
    } catch {}
  };

  const fetchMyCurrentBids = async () => {
    let res = await fetch(`/api/v1/auctions/myPostedBids`);
    try {
      if (res.status === 200) {
        res = await res.json();
        setMyBids(res);
      } else {
      }
    } catch {}
  };

  const wipeData = () => {
    setAuctions([]);
    setDisplayLoader(true);
    setHasMore(false);
    setProcessing(!processing);
  };

  useEffect(() => {
    auctionSearch();
    return () => {
      //wipeData();
    };
  }, []);

  const values = {
    activeAuction,
    setActiveAuction,
    setHighestBid,
    highestBid,
    auctionSearch,
    auctions,
    hasMore,
    displayLoader,
    wipeData,
    processing,
    myAuctions,
    myBids,
    fetchMyAuctionsHistory,
    fetchMyCurrentBids,
  };

  return (
    <AuctionContext.Provider value={values}>
      {props.children}
    </AuctionContext.Provider>
  );
};

export default AuctionContextProvider;
