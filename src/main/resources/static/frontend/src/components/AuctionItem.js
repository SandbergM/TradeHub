import React from "react";
import { Card, CardText, CardBody, CardTitle, Col } from "reactstrap";

const AuctionItem = () => {
  const goToDetails = () => {
    console.log("click");
  };

  return (
    <Col>
      <Card className="text-center mb-3" onClick={goToDetails}>
        <CardBody>
          <CardTitle tag="h3" className="text-warning">
            TITLE
          </CardTitle>
        </CardBody>
        <img
          width="100%"
          src="https://balstaauktionshall.nu/images/custom/ProductTemplate/133359.jpg"
          alt="auction-img"
        />
        <CardBody>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <CardText tag="h5" className="text-warning">
            00:50 sec
          </CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AuctionItem;
