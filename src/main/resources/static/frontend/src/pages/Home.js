import React from "react";
import AuctionList from "../components/AuctionList";

const Home = () => {
  return (
    <div>
      <h1 className="text-warning text-center">Auktioner</h1>
      <AuctionList></AuctionList>
    </div>
  );
};

export default Home;
