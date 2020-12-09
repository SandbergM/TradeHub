import React, { useState, useEffect, useContext } from "react";
import { AuctionContext } from "../context/AuctionContextProvider";
import { withRouter } from "react-router-dom";
import AuctionList from "../components/AuctionList";
import SearchField from "../components/SearchField";

const Home = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  const {
    auctions,
    hasMore,
    displayLoader,
    auctionSearch,
    wipeData,
    processing,
  } = useContext(AuctionContext);

  useEffect(() => {
    wipeData();
  }, [query]);

  useEffect(() => {
    auctionSearch(`?page=${page}${query}`);
  }, [page || processing]);

  return (
    <div>
      <SearchField className="col-12" setQuery={setQuery} />
      <h1 className="tradeHub-orange text-center col-12 mb-4 p-0">Auktioner</h1>
      <div className="col-12"></div>
      <AuctionList
        className="col-12"
        setPage={setPage}
        xs={1}
        md={1}
        lg={3}
        auctions={auctions}
        hasMore={hasMore}
        displayLoader={displayLoader}
      ></AuctionList>
    </div>
  );
};

export default withRouter(Home);
