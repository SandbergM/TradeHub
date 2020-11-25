import React, { useState, useEffect } from "react";
import { Card, CardText, CardBody, CardTitle, Col } from "reactstrap";

const AuctionItem = (props) => {
  const [time, setTime] = useState(0);

  const goToDetails = () => {
    console.log("click");
    console.log(props.timer)
  };

  const timer = () => {
    let endDate = props.timer*1000;
    //const endDate = new Date(milliseconds);
    const currentDate = new Date().getTime();
    let difference = endDate - currentDate;
    console.log(difference)

    if (difference <= 0 || endDate == null) {
      setTime("Tiden är slut");
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
      <Card className="text-center mb-3" onClick={goToDetails}>
        <CardBody>
          <CardTitle tag="h5" className="text-warning">
            {props.title}
          </CardTitle>
        </CardBody>
        <img width="100%" src={props.image} alt="auction-img" />
        <CardBody>
           <CardText></CardText> 
          <CardText tag="h5" className="text-warning">
            {time}
          </CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AuctionItem;
