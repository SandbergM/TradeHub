import React, { useState, useEffect } from "react";
import { Card, CardText, CardBody, CardTitle, Col } from "reactstrap";
import "../css/AuctionItem.css";

const AuctionItem = (props) => {
  const [time, setTime] = useState(0);

  const goToDetails = () => {
    console.log(props.title);
  };

  const timer = () => {
    let endDate = props.timer * 1000;
    let currentDate = new Date().getTime();
    let difference = endDate - currentDate;

    if (difference <= 0 || endDate == null) {
      setTime("Tiden har gått ut");
    } else {
      let seconds = Math.floor(difference / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);
      hours %= 24;
      minutes %= 60;
      seconds %= 60;

      if (days <= 0 && hours <= 0) {
        setInterval();
        setTime(minutes + " min ");
      } else if (days <= 0) {
        setTime(hours + " tim " + minutes + " min ");
      } else {
        endDate = new Date(endDate).toLocaleDateString();
        setTime(endDate);
      }
    }
  };

  useEffect(() => {
    timer();
  }, []);

  return (
    <Col>
      <Card className="text-center mb-3 pointer" onClick={goToDetails}>
        <CardBody>
          <CardTitle tag="h5" className="text-warning">
            {props.title}
          </CardTitle>
        </CardBody>
        <img width="100%" src={props.image} alt="auction-img" />
        <CardBody>
          {props.highestBid ? (
            <CardText>{props.highestBid} kr</CardText>
          ) : (
            <CardText>{props.price} kr</CardText>
          )}
          <CardText tag="h5" className="text-warning">
            {time}
          </CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AuctionItem;
