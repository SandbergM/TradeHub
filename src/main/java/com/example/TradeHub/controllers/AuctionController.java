package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.Auction;
import com.example.TradeHub.services.AuctionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auctions")
public class AuctionController {

    @Autowired
    AuctionService auctionService;

    @GetMapping
    @Operation(summary = "Fetch a LIST of auctions with various optional parameters")
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Auction.class)) }),
            @ApiResponse(responseCode = "404", description = "Not Found",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content })
    })
    public ResponseEntity<List<Auction>> getAuctions(
            @Parameter(description="Page used for pagination, Integer" , required = false)
            @RequestParam( value="page", defaultValue = "1" ) Integer page,
            @Parameter(description="Auction id, String ( MongoDb uuid )" , required = false)
            @RequestParam( value="id", defaultValue = "" ) String id,
            @Parameter(description="Auction title, String" , required = false)
            @RequestParam( value="title", defaultValue = "" ) String title,
            @Parameter(description="Dynamic sort-by, String" , required = false)
            @RequestParam( value="sortBy", defaultValue = "") String sortBy,
            @Parameter(description="Used to sort active/finished auctions, Boolean" , required = false)
            @RequestParam( value="active", defaultValue = "true") Boolean active
    ){
        List<Auction> auctions = auctionService.auctionCriteriaSearch(page, title, id, sortBy, active);
        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Fetch ONE auction using id")
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema( implementation = Auction.class )) }),
            @ApiResponse(responseCode = "404", description = "Not Found",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content })
    })
    public ResponseEntity<Auction> getAuctionById(
            @Parameter(description="Auction id, String ( MongoDb uuid )" , required = true)
            @PathVariable( value = "id" ) String id
    ){
        Auction auction = auctionService.findById(id);
        return ResponseEntity.ok(auction);
    }

    @GetMapping("/myPostedAuctions")
    @Operation(summary = "Fetch a LIST of auctions posted by the current authenticated user - Authentication required")
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema( implementation = Auction.class )) }),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = { @Content }),
            @ApiResponse(responseCode = "404", description = "Not Found",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content })
    })
    public ResponseEntity<List<Auction>> getLoggedInUsersPostedAuctions(){
        List<Auction> auctions = auctionService.currentUsersPostedAuctions();
        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/myPostedBids")
    @Operation(summary = "Fetch a LIST of auctions the current authenticated user has the highest bid on - Authentication required")
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema( implementation = Auction.class )) }),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = { @Content }),
            @ApiResponse(responseCode = "404", description = "Not Found",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content })
    })
    public ResponseEntity<List<Auction>> getLoggedInUsersPostedBids(){
        List<Auction> auctions = auctionService.currentUsersPostedBids();
        return ResponseEntity.ok(auctions);
    }

    @PostMapping
    @Operation(summary = "Publish/Save ONE new auction - Authentication required")
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema( implementation = Auction.class )) }),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = { @Content }),
            @ApiResponse(responseCode = "403", description = "Bad Request",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content })
    })
    public ResponseEntity<Auction> postNewAuction( @RequestBody Auction auction ){
        Auction newAuction = auctionService.postNewAuction(auction);
        URI uri = URI.create("/api/v1/auctions?id=" + newAuction.getId());
        return ResponseEntity.created(uri).body(newAuction);
    }

    @PostMapping("/{id}/{bid}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Publish/Update the bid of ONE auction using the auctions id - Authentication required")
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema( implementation = Auction.class )) }),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = { @Content }),
            @ApiResponse(responseCode = "403", description = "Bad Request",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content })
    })
    public void postNewBid(
            @Parameter( description="Auction id, String ( MongoDb uuid )" , required = true )
            @PathVariable( value = "id" ) String id,
            @Parameter( description="Bid placed by user , Integer" , required = true )
            @PathVariable( value = "bid" ) Integer bid
    ){
        auctionService.updateCurrentBidOnLiveAuction(id, bid);
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    @Operation(summary = "Delete ONE auction with a specific id - Admin-role required")
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content }),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = { @Content }),
            @ApiResponse(responseCode = "404", description = "Not Found",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content })
    })
    public void deleteAuction(
            @Parameter( description="Auction id, String ( MongoDb uuid )" , required = true )
            @PathVariable( value = "id" ) String id
    ){
        auctionService.deleteAuction(id);
    }

}