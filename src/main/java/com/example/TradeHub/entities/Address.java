package com.example.TradeHub.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "addresses")
public class Address {

    @Id
    @NonNull
    String id;
    String streetName;
    String postalCode;
    String city;
    String country;

    public Address(String streetName, String postalCode, String city, String country) {
        this.streetName = streetName;
        this.postalCode = postalCode;
        this.city = city;
        this.country = country;
    }
}
