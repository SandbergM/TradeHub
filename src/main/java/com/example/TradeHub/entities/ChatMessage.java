package com.example.TradeHub.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document( collection = "chatMessages" )
public class ChatMessage {

    @DBRef
    private User sender;
    @DBRef
    private User receiver;
    private String message;
    private long timestamp;
    private String roomId;

}
