package com.example.TradeHub.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

/**
 * <Description>
 *
 * @author Martin Hellström
 * @version 1.0
 * @since 11/30/2020
 */

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
