package com.example.TradeHub.services;

import com.example.TradeHub.entities.Auction;
import com.example.TradeHub.entities.User;
import com.example.TradeHub.repositories.AuctionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class AuctionService {

    @Autowired
    AuctionRepo auctionRepo;
    @Autowired
    UserService userService;

    public Auction postNewAuction(Auction auction){
        User seller = userService.getCurrentUser();
        auction.setSeller(seller);
        Auction newlyCreatedAuction = auctionRepo.save(auction).orElse(null);
        if(newlyCreatedAuction == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Could not process the request");
        }
        return newlyCreatedAuction;
    }

    public void updateCurrentBidOnLiveAuction(String id, int bid){
        Auction auctionToUpdate = this.findById(id);
        User bidder = userService.getCurrentUser();
        this.bidderAndSellerCheck(bidder.getId(), auctionToUpdate.getSeller().getId());
        this.bidCheck(auctionToUpdate.getPrice(), auctionToUpdate.getHighestBid(), bid);
        this.timeCheck(auctionToUpdate.getTimestamp());
        auctionToUpdate.setHighestBid(bid);
        auctionToUpdate.setBidder(bidder);
        auctionRepo.save(auctionToUpdate);
    }

    public Auction findById(String id){
        Auction auction = auctionRepo.findById(id).orElse(null);
        if(auction == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
        }
        System.out.println(auction);
        return auction;
    }

    public List<Auction> auctionCriteriaSearch(int page, String title, String id) {
        List<Auction> auctions = auctionRepo.auctionCriteriaSearch(page, title, id).orElse( new ArrayList<>());
        if(auctions.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
        }
        return auctions;
    }

    public List<Auction> currentUsersPostedAuctions(){
        String userId = userService.getCurrentUser().getId();
        List<Auction> postedAuctions = auctionRepo.findBySellerId(userId).orElse( new ArrayList<>());
        if(postedAuctions.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No auctions were found");
        }
        return postedAuctions;
    }

    public List<Auction> currentUsersPostedBids(){
        String userId = userService.getCurrentUser().getId();
        List<Auction> postedBids = auctionRepo.findByBuyerId(userId).orElse( new ArrayList<>());
        if(postedBids.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No bids were found");
        }
        return postedBids;
    }


    public void deleteAuction(String id){
        Auction auctionToBeDeleted = this.findById(id);
        auctionRepo.deleteById(auctionToBeDeleted.getId());
    }


    private void bidderAndSellerCheck(String buyerId, String sellerId){
        if(buyerId.equals(sellerId)){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Bad request, you're not allowed to bid on your own auctions"
            );
        }
    }

    private void bidCheck(int startingPrice, int currentHighestBid, int newBid){
        if( startingPrice >= newBid || currentHighestBid >= newBid ){
            throw new ResponseStatusException( HttpStatus.BAD_REQUEST, "Bid was not accepted" );
        }
    }

    private void timeCheck(long auctionEndTime){
        long currentTime = Instant.now().getEpochSecond();
        if( auctionEndTime < currentTime ){
            throw new ResponseStatusException( HttpStatus.BAD_REQUEST, "Bid was not accepted" );
        }
    }

}
