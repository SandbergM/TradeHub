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
  const items = [
    {
      src:
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
      altText: "Slide 1",
      caption: "Slide 1",
    },
  ];

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

      <div className="orange-background col-6 mx-auto">
        <h6>
          Högsta bud:{" "}
          {activeAuction.highestBid ? activeAuction.highestBid : "Inga bud"}
        </h6>
        <h6>Kvarstående tid: {new Date(activeAuction.timestamp).toString()}</h6>
      </div>

      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        className="mt-4"
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

      <div className="mx-auto mt-4">
        <input
          type="number"
          placeholder="Lägg bud..."
          value={bid}
          onChange={(e) => setBid(e.target.value)}
        ></input>
        <Button
          type="submit"
          className="ml-2 orange-background"
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

export default AuctionDetailsPageData