import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { Card, CardText, CardBody, CardTitle, Col } from "reactstrap";
import { getThumbNail } from '../utils/imageHandler'
import { AuctionContext } from '../context/AuctionContextProvider'
import "../sass/styles.scss"

const AuctionItem = (props) => {
  const { setActiveAuction } = useContext(AuctionContext);
  const [time, setTime] = useState(0);

  let history = useHistory()

  const goToDetails = () => {
    setActiveAuction(props)
    history.push("/auction/" + props.auction.title + "/" + props.auction.id);
  };

  const timer = () => {
    let endDate = props.auction.timestamp * 1000;
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

      if (days <= 0 && hours <= 0 && minutes >=1) {
        setTime(minutes + " min ");
      } else if (days <= 0 && hours >=1) {
        setTime(hours + " tim " + minutes + " min ");
      }
        else if(minutes <=0){
          setTime(seconds + ' s')
        }
       else {
        endDate = new Date(endDate).toLocaleDateString();
        setTime(endDate);
      }
    }
  };

  useEffect(() => {
    timer();
  }, []);

  return (
    <Col className="p-0 pr-3 pl-3">
      <Card className="text-center mb-3 pointer" onClick={goToDetails}>
        <CardBody>
          <CardTitle tag="h5" className="text-warning">
            {props.auction.title}
          </CardTitle>
        </CardBody>
        <img width="100%" src={getThumbNail(props.auction.images)} alt="auction-img" />
        <CardBody>
          {props.auction.highestBid ? (
            <CardText>{props.auction.highestBid} kr</CardText>
          ) : (
            <CardText>{props.auction.price} kr</CardText>
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
