import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../context/UserContext'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Button,
} from "reactstrap";
import SellerChatModal from "./SellerChatModal";

const AuctionDetailsPageData = ({ activeAuction, bid, setBid, postBid, showErrorMessage, acceptedBid }) => {
  const {user} = useContext(UserContext);
  
  const items = [];
  items.push({ src: activeAuction.image, altText: "", caption: "" });
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [time, setTime] = useState(0);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  let IntervalId = null;

  const debounceInterval = () => {
    console.log(time);
    if (IntervalId !== null) {
      clearInterval(IntervalId);
      IntervalId = null;
    }
    IntervalId = setInterval(() => {
      timer()
    }, 500);
  };

    const timer = () => {
      let current = time
      console.log("Timer count in AuctionDetailsPageData.js, codeline: 52", current);
      let endDate = activeAuction.auction.timestamp * 1000;
      let currentDate = new Date().getTime();
      let difference = endDate - currentDate;

      if (difference <= 0 || endDate == null) {
        setTime("Avslutad");
      } else {
        let seconds = Math.floor(difference / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
        hours %= 24;
        minutes %= 60;
        seconds %= 60;
    

        if (days <= 0 && hours <= 0) {
          if(minutes <= 0){
            setTime(seconds + ' sek')
          }
          else{
            setTime((minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds));
          }
        } else {
          if(days <=0){
            setTime(hours + ":" + (minutes < 10 ? '0' + minutes : minutes));
          }
          else{
            if(hours <=0){
          setTime(days + 'd');
            }
            else if(hours >=1){
              setTime(days +'d ' + hours + "h")
            }
          }
        } 
      }
    };

    useEffect(() => {
      let endDate = activeAuction.auction.timestamp * 1000;
      let currentDate = new Date().getTime();
      let auctionTime = endDate - currentDate;
      if(!(auctionTime <= 0)){
        debounceInterval();
      }
      else{
        setTime("Avslutad")
      }
      return(()=>{
        clearInterval(IntervalId);
      })
    }, []);

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <div className="mt-4 mx-auto">
      <h2 className="text-center tradeHub-orange m-5">{activeAuction.title}</h2>

      <p className="m-0 ml-1 font-weight-bold history tradeHub-grey">
        BID HISTORY
      </p>
      <div className="flex-container">
        <div className="text-center orange-background font-weight-bold bid-block">
          <p className="m-0">HÖGSTA BUD</p>
          <p className="m-0 highest-bid">
            {activeAuction.highestBid
              ? activeAuction.highestBid
              : activeAuction.price}
          </p>
        </div>
        <div className="text-center orange-border font-weight-bold time-left-block">
          <p className="m-0">TID KVAR</p>
          <p className="m-0 time-left">{time}</p>
        </div>
      </div>

      <div>
        <style>
          {`.custom-tag {
              max-width: 100%;
              height: 500px;
              background: black;
            }`}
        </style>

        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          className="mt-4 carousel"
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
      </div>

      <div className="flex-container mt-4">
        <input
          className="orange-border place-bid-block"
          type="number"
          placeholder="Lägg bud..."
          value={bid}
          onChange={(e) => setBid(e.target.value)}
        ></input>
        {user !== null ? (
          <Button
            type="submit"
            className="orange-background font-weight-bold place-bid-button"
            onClick={() => postBid()}
          >
            LÄGG BUD
          </Button>
        ) : (
          <Button
            type="submit"
            className="grey-background font-weight-bold place-bid-button"
            disabled
          >
            Logga in för att lägga bud
          </Button>
        )}
      </div>
      {showErrorMessage === 0 ? (
        ""
      ) : showErrorMessage === 1 ? (
        <div className="error-text">
          Budet måste vara högre än nuvarande bud
        </div>
      ) : (
        <div className="error-text">Du måste skriva in ett bud</div>
      )}
      <div className="mt-4"></div>
      <p className="mt-4 ml-4 font-italic">{activeAuction.description}</p>
      <div className="mt-4">
        <p className="mb-1">
          <span className="seller ml-4">Seller:</span>{" "}
          {activeAuction.seller ? activeAuction.seller.fullName : null}
        </p>
        <SellerChatModal activeAuction={activeAuction} />
      </div>
    </div>
  );
};

export default AuctionDetailsPageData;
