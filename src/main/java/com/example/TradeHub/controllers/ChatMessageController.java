package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.entities.Room;
import com.example.TradeHub.services.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
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
    public void postNewChatMessage(@RequestBody ChatMessage chatMessage) {
        chatMessageService.postNewMessage(chatMessage);
    }

    @GetMapping("/room")
    public Room getRoomId(@PathParam( value = "receiverId") String receiverId) {
        System.out.println(receiverId);
        return chatMessageService.getRoom(receiverId);
    }

}
