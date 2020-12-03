import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import AuctionList from "../components/AuctionList";
import SearchField from '../components/searchField'

const Home = () => {

  const [ query, setQuery ] = useState("");

  return (
    <div >
      <SearchField className="col-12" setQuery={ setQuery } />
      <h1 className="tradeHub-orange text-center col-12 mb-4 p-0">Auktioner</h1>
      <div className="col-12"></div>
      <AuctionList className="col-12" fetch={ query } xs={1} md={1} lg={3} ></AuctionList>
    </div>
  );
};  

export default withRouter(Home);
