package com.example.TradeHub.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.mail.Message;

@Data
public class SocketPayload {

    private String action;
    private String target;
    private Bid bid;
    private ChatMessage chatMessage;

    public SocketPayload(String action, String target, Bid bid) {
        this.action = action;
        this.target = target;
        this.bid = bid;
    }

    public SocketPayload(String action, String target, ChatMessage chatMessage) {
        this.action = action;
        this.target = target;
        this.chatMessage = chatMessage;
    }
}