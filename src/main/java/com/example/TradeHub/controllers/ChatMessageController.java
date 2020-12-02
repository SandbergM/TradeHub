package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.services.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <Description>
 *
 * @author Martin Hellström
 * @version 1.0
 * @since 11/30/2020
 */

@RestController
@RequestMapping("/rest/chatMessages")
public class ChatMessageController {

    @Autowired
    ChatMessageService chatMessageService;

    @GetMapping
    public List<ChatMessage> getAllChatMessages(){
        return chatMessageService.getAllChatMessages();
    }

    @PostMapping
    public ResponseEntity<Boolean> postNewChatMessage(@RequestBody ChatMessage chatMessage){
        boolean didSave = chatMessageService.postNewMessage(chatMessage);

        return ResponseEntity.ok(didSave);
    }
}