package com.example.TradeHub.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document( collection = "companies" )
@TypeAlias( "company" )
public class Company {

    @Id
    private String id;
    private String name;
    private String organizationNumber;

    public Company(String name, String organizationNumber) {
        this.name = name;
        this.organizationNumber = organizationNumber;
    }

}
