package com.example.TradeHub.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SocketPayload {

    private String action;
    private String target;
    private Object content;

}