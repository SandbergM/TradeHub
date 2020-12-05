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
    /*
    SocketService has no need to care about what Object content consists of,
    it is only used to package what we want to send to the frontend via SocketService,
    Want to send a new Bid... fine, want to send a chatMessage? also fine, SocketService
    doesn't care what this part consists of, it only needs where to send it, that's what we use
    action, target and room for.
    We send the entire payload to frontend, since we need action, target and room to filter out
    the traffic there to.
     */
    private Object content;

    /*
    Every room should have an id, no need to clutter down the rest of the code,
    we can set the target here and save us the headache everywhere else
     */
    public SocketPayload(String action, Room room, Object content) {
        this.action = action;
        this.room = room;
        this.content = content;
        this.target = room.getId();
    }

}