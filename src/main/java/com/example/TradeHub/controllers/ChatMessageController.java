package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.entities.Room;
import com.example.TradeHub.services.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chatMessage")
public class ChatMessageController {

    @Autowired
    ChatMessageService chatMessageService;

    @GetMapping("/conversation/{id}")
    public ResponseEntity<List<ChatMessage>> getConversation(
            @PathVariable String id
    ){
        System.out.println(id);
        return ResponseEntity.ok().body(chatMessageService.getConversation(id));
    }

    @PostMapping
    public void postNewChatMessage(@RequestBody ChatMessage chatMessage) {
        chatMessageService.postNewMessage(chatMessage);
    }

    @GetMapping("/room/{id}")
    public ResponseEntity<Room> getRoomId(@PathVariable String id) {
        return ResponseEntity.ok().body(chatMessageService.getRoom(id));
    }

}
