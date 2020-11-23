package com.example.TradeHub.entities;

import org.springframework.data.annotation.Id;

public class Image {
    @Id
    private String id;
    private String url;
    private Boolean primary;
}
