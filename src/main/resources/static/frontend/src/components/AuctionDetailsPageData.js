import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { sortImagesAfterPriority } from "../utils/imageHandler.js";

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Button,
} from "reactstrap";
import SellerChatModal from "./SellerChatModal";
import imageMissing from "../images/bild_saknas.png";

const AuctionDetailsPageData = ({
  activeAuction,
  bid,
  setBid,
  postBid,
  showErrorMessage,
}) => {
  const { user } = useContext(UserContext);
  const serverAddress = "http://localhost:8080";
  let userId = "No user";

  if (activeAuction.images == null) {
    activeAuction.images = [{ url: "empty" }];
  }

  if (user !== null) {
    userId = user.id;
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [time, setTime] = useState(0);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === activeAuction.images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? activeAuction.images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  let IntervalId = null;

  const debounceInterval = () => {
    if (IntervalId !== null) {
      clearInterval(IntervalId);
      IntervalId = null;
    }
    IntervalId = setInterval(() => {
      timer();
    }, 500);
  };

  const timer = () => {
    let current = time;
    let endDate = activeAuction.timestamp * 1000;
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
        if (minutes <= 0) {
          setTime(seconds + " sek");
        } else {
          setTime(
            (minutes < 10 ? "0" + minutes : minutes) +
              ":" +
              (seconds < 10 ? "0" + seconds : seconds)
          );
        }
      } else {
        if (days <= 0) {
          setTime(hours + ":" + (minutes < 10 ? "0" + minutes : minutes));
        } else {
          if (hours <= 0) {
            setTime(days + "d");
          } else if (hours >= 1) {
            setTime(days + "d " + hours + "h");
          }
        }
      }
    }
  };

  useEffect(() => {
    let endDate = activeAuction.timestamp * 1000;
    let currentDate = new Date().getTime();
    let auctionTime = endDate - currentDate;
    if (!(auctionTime <= 0)) {
      debounceInterval();
    } else {
      setTime("Avslutad");
    }
    return () => {
      clearInterval(IntervalId);
    };
  }, []);

  const slides = sortImagesAfterPriority(activeAuction.images).map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.id}
      >
        <img
          src={item.url === "empty" ? imageMissing : serverAddress + item.url}
          alt="visual representation of an auction"
        />
        <CarouselCaption captionText="" captionHeader="" />
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
          <p className="m-0 highest-bid">{bid}</p>
        </div>
        <div className="text-center orange-border font-weight-bold time-left-block">
          <p className="m-0">TID KVAR</p>
          <p className="m-0 time-left">{time}</p>
        </div>
      </div>

      <div>
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          className="mt-4 carousel"
        >
          <CarouselIndicators
            items={activeAuction.images}
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

      {activeAuction.seller.id !== userId ? (
        <div className="flex-container mt-4">
          <input
            className="orange-border place-bid-block"
            type="number"
            placeholder="Lägg bud..."
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
      ) : (
        <div></div>
      )}
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
          <span className="seller ml-4">Säljare:</span>{" "}
          {activeAuction.seller ? activeAuction.seller.fullName : null}
        </p>
        {activeAuction.seller.id !== userId && (
          <SellerChatModal receiverId={activeAuction.seller.id} roomId={null} />
        )}
      </div>
    </div>
  );
};

export default AuctionDetailsPageData;
