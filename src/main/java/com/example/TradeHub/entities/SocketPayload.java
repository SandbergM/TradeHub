package com.example.TradeHub.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SocketPayload {

    private String action;
    private String target;
    private Room room;
    private Object content;

    public SocketPayload(String action, Room room, Object content) {
        this.action = action;
        this.room = room;
        this.content = content;
        this.target = room.getId();
    }

}