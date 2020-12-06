import React from "react";
import useSound from "use-sound";
import sound from "../sounds/tradehub-page-not-found-sound.mp3";
import { useHistory } from "react-router-dom";

const PageNotFound = () => {
  const [play] = useSound(sound, { volume: 0.25 });

  let history = useHistory();

  const redirect = () => {
    play();
    setTimeout(() => {
      history.push("/");
    }, 3200);
  };

  return (
    <div id="page-not-found-main-container">
      <div
        id="page-not-found-upper-container"
        className="row bold justify-content-md-center pt-5"
      >
        <div className="col-4 col-xl-3 page-not-found-number tradeHub-orange text-right">
          4
        </div>
        <div className="col-4 col-xl-3 page-not-found-number tradeHub-dark-grey text-center">
          0
        </div>
        <div className="col-4 col-xl-3 page-not-found-number tradeHub-orange text-left">
          4
        </div>
      </div>
      <div className="row text-center" id="page-not-found-lower-container">
        <div className="col-12 mt-4 mb-5 tradeHub-dark-grey ">
          Sidan du söker kan tyvärr inte hittas
        </div>
        <div className="col-12 mt-5 mb-3">
          <span
            className="pointer"
            id="page-not-found-redirect-trigger"
            onClick={redirect}
          >
            Till startsidan
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
