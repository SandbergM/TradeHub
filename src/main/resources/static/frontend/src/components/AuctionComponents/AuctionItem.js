import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardText, CardBody, CardTitle, Col } from "reactstrap";
import { getThumbNail } from '../../utils/imageHandler'
import { AuctionContext } from '../../context/AuctionContextProvider'
import { UserContext } from "../../context/UserContext";

const AuctionItem = (props) => {
  const { setActiveAuction } = useContext(AuctionContext);
  const { user } = useContext(UserContext);
  const [time, setTime] = useState(0);

  let history = useHistory()

  const goToDetails = () => {
    setActiveAuction(props.auction)
    history.push("/auction/" + props.auction.title + "/" + props.auction.id);
  };

  const getUserInfo = (userDetail) => {
    if (user && user.company) {
      switch (userDetail) {
        case "company":
          userDetail = user.company.name;
          break;
        case "companyNumber":
          userDetail = user.company.organizationNumber;
      }
      return userDetail;
    }
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
      <Card
        className="tradeHub-card text-center mb-3 pointer"
        onClick={goToDetails}
      >
        <CardBody className="tradeHub-cardBody">
          <CardTitle tag="h5">{props.auction.title}</CardTitle>
        </CardBody>
        <img
          className="tradeHub-cardImg"
          src={getThumbNail(props.auction.images)}
          alt="auction-img"
        />
        <CardBody>
          {props.auction.highestBid ? (
            <CardText>
              {props.auction.highestBid} kr{" "}
              <span>
                {getUserInfo("company") ? (
                  <span>({props.auction.highestBid * 0.75} kr utan moms)</span>
                ) : (
                  ""
                )}
              </span>
            </CardText>
          ) : (
            <CardText>
              {props.auction.price} kr{" "}
              <span>
                {getUserInfo("company") ? (
                  <span>({props.auction.price * 0.75} kr utan moms)</span>
                ) : (
                  ""
                )}
              </span>
            </CardText>
          )}
          <CardText tag="h5">{time}</CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AuctionItem;
