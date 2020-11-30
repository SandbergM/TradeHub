import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

  const items = activeAuction.images || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

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
    <div className="text-center mt-4 mx-auto">
      <h2 className="tradeHub-orange m-4">{activeAuction.title}</h2>

      <div className="orange-background">
        <h6>
          Högsta bud:
          {activeAuction.highestBid ? activeAuction.highestBid : "Inga bud"}
        </h6>
        <h6>Kvarstående tid: {new Date(activeAuction.timestamp).toString()}</h6>
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

      <div className="mt-4">
        <input
          type="number"
          placeholder="Lägg bud..."
          value={bid}
          onChange={(e) => setBid(e.target.value)}
        ></input>
        <Button
          type="submit"
          className="orange-background"
          onClick={() => postBid()}
        >
          Lägg bud
        </Button>
      </div>

      <p className="mt-4">{activeAuction.description}</p>

      <div className="mt-4">
        <p>
          Seller: {activeAuction.seller ? activeAuction.seller.fullName : null}
        </p>
        <Button type="submit" className="orange-background">
          Chatta med säljare
        </Button>
      </div>
    </div>
  );
};

export default AuctionDetailsPageData;
