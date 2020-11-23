package com.example.TradeHub.services;

import com.example.TradeHub.entities.Auction;
import com.example.TradeHub.repositories.AuctionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
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
    UserRepo userRepo;

    public Auction postNewAuction(Auction auction){
        User seller = this.loggedInUser();
        auction.setSeller(seller);
        Auction newlyCreatedAuction = auctionRepo.save(auction).orElse(null);
        if(newlyCreatedAuction == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Could not process the request");
        }
        return newlyCreatedAuction;
    }

    public Boolean updateCurrentBidOnLiveAuction(String id, int bid){
        Auction auctionToUpdate = this.findById(id);
        User bidder = this.loggedInUser();
        this.bidderAndSellerCheck(bidder.getId(), auctionToUpdate.getSeller().getId());
        this.bidCheck(auctionToUpdate.getHighestBid(), bid);
        this.timeCheck(auctionToUpdate.getTimestamp());
        auctionToUpdate.setHighestBid(bid);
        auctionToUpdate.setBidder(bidder);
        return true;
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
        String userId = this.loggedInUser().getId();
        List<Auction> postedAuctions = auctionRepo.findBySellerId(userId).orElse( new ArrayList<>());
        if(postedAuctions.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No auctions were found");
        }
        return postedAuctions;
    }

    public List<Auction> currentUsersPostedBids(){
        String userId = this.loggedInUser().getId();
        List<Auction> postedBids = auctionRepo.findByBuyerId(userId).orElse( new ArrayList<>());
        if(postedAuctions.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No bids were found");
        }
        return postedBids;
    }


    public void deleteAuction(String id){
        Auction auctionToBeDeleted = this.findById(id);
        auctionRepo.deleteById(auctionToBeDeleted.getId());
    }

    private User loggedInUser(){
        User user = SecurityContextHolder.getContext().getAuthentication().getCredentials();
        String email = user.getEmail();
        User currentUser = userRepo.findByEmail(email);
        if(currentUser == null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        return currentUser;
    }

    private void bidderAndSellerCheck(String buyerId, String sellerId){
        if(buyerId.equals(sellerId)){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Bad request, you're not allowed to bid on your own auctions"
            );
        }
    }

    private void bidCheck(int currentHighestBid, int newBid){
        if(currentHighestBid >= newBid){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bid was not accepted");
        }
    }

    private void timeCheck(long auctionEndTime){
        if(auctionEndTime <= Instant.now().toEpochMilli()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bid was not accepted");
        }
    }

}
