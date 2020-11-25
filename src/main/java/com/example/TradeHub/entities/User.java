package com.example.TradeHub.entities;

import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Document( collection = "user" )
public class User {

    @Id
    private String id;
    private String email;
    private String password;
    private String fullName;
    @DBRef
    private Address address;
    @DBRef
    @JsonBackReference
    private ArrayList<Auction> auctions;
    @DBRef
    private Company company;


    public User(String email, String password, String fullName, Address address, ArrayList<Auction> auctions, Company company) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.address = address;
        this.auctions = auctions;
        this.company = company;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

}
