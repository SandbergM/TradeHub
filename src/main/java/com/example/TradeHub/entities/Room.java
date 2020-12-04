package com.example.TradeHub.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document( collection = "rooms" )
public class Room {

    @Id
    private String id;
    private ArrayList<String> participants;
    @Transient
    private List<WebSocketSession> sessions;

    public Room(String id) {
        this.id = id;
    }

    public Room(ArrayList<String> participants) {
        this.participants = participants;
    }

    public Room(List<WebSocketSession> sessions){
        this.sessions = sessions;
    }

}