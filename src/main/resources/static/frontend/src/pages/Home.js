import React from "react";
import AuctionList from "../components/AuctionList";
import RegisterNewAuction from "../components/RegisterNewAuction";

const Home = () => {
  return (
    <div className="row">
      <h1 className="tradeHub-orange text-center col-12 m-4">Auktioner</h1>
        <AuctionList className="col-12"></AuctionList>
    </div>
  );
};  

export default Home;
