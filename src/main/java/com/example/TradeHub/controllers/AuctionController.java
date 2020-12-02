package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.Auction;
import com.example.TradeHub.services.AuctionService;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auctions")
public class AuctionController {

    @Autowired
    AuctionService auctionService;

    @GetMapping()
    public ResponseEntity<List<Auction>> getAuctions(
            @RequestParam( value="page", defaultValue = "1" ) Integer page,
            @RequestParam( value="id", defaultValue = "" ) String id,
            @RequestParam( value="title", defaultValue = "" ) String title,
            @RequestParam( value="sortBy", defaultValue = "") String sortBy,
            @RequestParam( value="active", defaultValue = "true") Boolean active
    ){
        List<Auction> auctions = auctionService.auctionCriteriaSearch(page, title, id, sortBy, active);
        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auction> getAuctionById(
            @PathVariable( value = "id" ) String id
    ){
        Auction auction = auctionService.findById(id);
        return ResponseEntity.ok(auction);
    }

    @GetMapping("/myPostedAuctions")
    public ResponseEntity<List<Auction>> getLoggedInUsersPostedAuctions(){
        List<Auction> auctions = auctionService.currentUsersPostedAuctions();
        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/myPostedBids")
    public ResponseEntity<List<Auction>> getLoggedInUsersPostedBids(){
        List<Auction> auctions = auctionService.currentUsersPostedBids();
        return ResponseEntity.ok(auctions);
    }

    @PostMapping()
    public ResponseEntity<Auction> postNewAuction( @RequestBody Auction auction ){
        Auction newAuction = auctionService.postNewAuction(auction);
        URI uri = URI.create("/api/v1/auctions?id=" + newAuction.getId());
        return ResponseEntity.created(uri).body(newAuction);
    }

    @PostMapping("/{id}/{bid}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void postNewBid(
            @PathVariable( value = "id" ) String id,
            @PathVariable( value = "bid" ) Integer bid
    ){
        auctionService.updateCurrentBidOnLiveAuction(id, bid);
    }

    @DeleteMapping("/{id}")
    public void deleteAuction(
            @PathVariable( value = "id" ) String id
    ){
        auctionService.deleteAuction(id);
    }

}