package com.example.TradeHub.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document( collection = "images" )
@TypeAlias( "image" )
public class Image {
    @Id
    private String id;
    private String url;
    private Boolean primary;

    public Image() {
    }

    public Image(String url, Boolean primary) {
        this.url = url;
        this.primary = primary;
    }
}
