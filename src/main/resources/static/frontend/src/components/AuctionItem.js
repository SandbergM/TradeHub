import React from "react";
import { Card, CardText, CardBody, CardTitle, Col } from "reactstrap";

const AuctionItem = (props) => {
  const goToDetails = () => {
    console.log("click");
  };

  return (
    <Col>
      <Card className="text-center mb-3" onClick={goToDetails}>
        <CardBody>
          <CardTitle tag="h3" className="text-warning">
            {props.title}
          </CardTitle>
        </CardBody>
        <img
          width="100%"
          src={props.image}
          alt="auction-img"
        />
        <CardBody>
          <CardText>
            {props.description}
          </CardText>
          <CardText tag="h5" className="text-warning">
           {props.timer}
          </CardText>
        </CardBody>
      </Card>
      </Col>
  );
};

export default AuctionItem;
