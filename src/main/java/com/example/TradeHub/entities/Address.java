package com.example.TradeHub.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * <Description>
 *
 * @author Martin Hellström
 * @version 1.0
 * @since 11/23/2020
 */

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

    public Address(String streetName, String postalCode, String city) {
        this.streetName = streetName;
        this.postalCode = postalCode;
        this.city = city;
    }
}
