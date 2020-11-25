package com.example.TradeHub.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.awt.*;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document( collection = "auctions" )
@TypeAlias( "auction" )
public class Auction {

    @Id
    @NonNull
    private String id;
    private String title;
    private Integer price;
    private String description;
    private Integer highestBid;
    @DBRef
    private Set<Image> images;
    @DBRef
    private User bidder;
    @DBRef(lazy = true)
    private User seller;
    private Long timestamp;

    public Auction(
            String title, Integer price, String description,
            Set<Image> images,  User seller, Long timestamp ) {

        this.title = title;
        this.price = price;
        this.description = description;
        this.images = images;
        this.seller = seller;
        this.timestamp = timestamp;

    }
}