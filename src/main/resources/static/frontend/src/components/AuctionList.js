import React from "react";
import { Col, Row } from "reactstrap";
import AuctionItem from "../components/AuctionItem";

const AuctionList = () => {
  let auctions = [1, 2, 3, 4, 5];
  return (
    <Row xs="1" sm="2" md="3">
        {auctions.map((auction, i) => {
            return (
            <AuctionItem
            key = {i}
            title = "TITLE"
            description = "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
            image = "https://balstaauktionshall.nu/images/custom/ProductTemplate/133359.jpg"
            timer = "00:00 sec"
            ></AuctionItem>
            ) 
        })}
    </Row>
  );
};
export default AuctionList;
