import React from "react";
import { Row } from "reactstrap";
import AuctionItem from "./AuctionItem";
import { Spinner } from "reactstrap";

const AuctionList = ({
  auctions,
  xs,
  md,
  lg,
  hasMore,
  displayLoader,
  setPage,
}) => {
  return (
    <div>
      <Row xs={xs} md={md} lg={lg}>
        {auctions &&
          auctions.map((auction, i) => {
            return <AuctionItem auction={auction} key={i} />;
          })}

        {displayLoader && <div id="loader"></div>}
        {!displayLoader &&
          auctions &&
          auctions.length === 0 &&
          fetch !== "/myPostedBids" &&
          fetch !== "/myPostedAuctions" && (
            <div id="no-matches-found" className="tradeHub-orange bold">
              Din sökning matchade inte någon annons.
            </div>
          )}
      </Row>
      <div className="d-flex justify-content-center">
        {fetch !== "/myPostedBids" &&
          fetch !== "/myPostedAuctions" &&
          hasMore &&
          (displayLoader ? (
            <Spinner className="small-loader" color="orange" />
          ) : (
            <button
              className="col-4 tradeHub-button bold btn btn-secondary btn-block"
              onClick={() => {
                setPage(auctions.length / 15 + 1);
              }}
            >
              Hämta fler auktioner
            </button>
          ))}
      </div>
    </div>
  );
};
export default AuctionList;
