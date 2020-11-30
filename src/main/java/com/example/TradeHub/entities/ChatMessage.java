package com.example.TradeHub.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
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
@Document( collection = "messages" )
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {

    @Id
    private String id;
    private User sender;
    private String message;
    private List<User> users;
    private long timestamp;

}
