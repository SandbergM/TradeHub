import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Button,
} from "reactstrap";

const AuctionDetailsPageData = ({ activeAuction, bid, setBid, postBid }) => {
  console.log(activeAuction);
  
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

  let timeoutId = null;
  const debounceTimeout = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    timeoutId = setTimeout(() => {
      timer()
    }, 500);
  };

    const timer = () => {
      let endDate = activeAuction.timestamp * 1000;
      let currentDate = new Date().getTime();
      let difference = endDate - currentDate;

      if (difference <= 0 || endDate == null) {
        setTime("0:00");
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
            setTime(minutes + " min");
          }
        } else {
          if(days <=0){
            setTime(hours + ":" + minutes);
          }
          else{
            if(days === 1){
              setTime('Imorgon ' + hours + ':' + minutes)
            }
            else{
              setTime(days +' dagar ' + hours + " tim")
            }
          }
        } 
      }
      debounceTimeout();
    };

    useEffect(() => {
      debounceTimeout();
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
            {activeAuction.highestBid ? activeAuction.highestBid : activeAuction.price}
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
        <Button
          type="submit"
          className="orange-background font-weight-bold place-bid-button"
          onClick={() => postBid()}
        >
          LÄGG BUD
        </Button>
      </div>

      <div className="mt-4"></div>
      <p className="mt-4 ml-4 font-italic">{activeAuction.description}</p>
      <div className="mt-4">
        <p className="mb-1">
          <span className="seller ml-4">Seller:</span>{" "}
          {activeAuction.seller ? activeAuction.seller.fullName : null}
        </p>
        <Button type="submit" className="grey-background chat-with-seller">
          CHATTA MED SÄLJARE
        </Button>
      </div>
    </div>
  );
};

export default AuctionDetailsPageData;
