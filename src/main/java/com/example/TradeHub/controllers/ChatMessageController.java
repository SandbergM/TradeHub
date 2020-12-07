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
        return chatMessageService.getAllChatMessages();
    }

    @PostMapping
    public ResponseEntity<Boolean> postNewChatMessage(@RequestBody ChatMessage chatMessage) {
        boolean didSave = chatMessageService.postNewMessage( chatMessage );
        return ResponseEntity.ok(didSave);
    }
}
