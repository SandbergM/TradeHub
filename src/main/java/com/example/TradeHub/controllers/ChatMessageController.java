package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.repositories.RoomRepo;
import com.example.TradeHub.services.ChatMessageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

/**
 * <Description>
 *
 * @author Martin Hellström
 * @version 1.0
 * @since 11/30/2020
 */

@RestController
@RequestMapping("/api/v1/chatMessage")
public class ChatMessageController {

    @Autowired
    ChatMessageService chatMessageService;

    @GetMapping
    public HashMap<String, List<ChatMessage>> getAllChatMessages(){
        int page = 1;
        return chatMessageService.getAllChatMessages(page);
    }

    @PostMapping
    public ResponseEntity<ChatMessage> postNewChatMessage(@RequestBody ChatMessage chatMessage) {

        return ResponseEntity.ok(chatMessageService.postNewMessage( chatMessage ));
    }
}
