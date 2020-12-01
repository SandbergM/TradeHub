import React from "react";
import { withRouter } from "react-router-dom";
import AuctionList from "../components/AuctionList";
import RegisterNewAuction from "../components/RegisterNewAuction";
import SearchField from '../components/searchField'

const Home = () => {
  return (
    <div >
        <SearchField className="col-12"/>
      <h1 className="tradeHub-orange text-center col-12 mb-4 p-0">Auktioner</h1>
      <div className="col-12"></div>
      <AuctionList className="col-12" fetch={""} xs={1} sm={2} md={3} ></AuctionList>
    </div>
  );
};  

export default withRouter(Home);
