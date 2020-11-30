package com.example.TradeHub.services;

import com.example.TradeHub.dtos.SocketDTO;
import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.repositories.ChatMessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

/**
 * <Description>
 *
 * @author Martin Hellström
 * @version 1.0
 * @since 11/30/2020
 */
@Service
public class ChatMessageService {

    @Autowired
    ChatMessageRepo chatMessageRepo;

    @Autowired
    SocketService socketService;

    public List<ChatMessage> getAllChatMessages() {return chatMessageRepo.findAll();}


    //This function will most likely be adjusted to chatroom functionality and the return will be optimized.
    public boolean postNewMessage(ChatMessage chatMessage){

        chatMessage.setTimestamp(Instant.now().toEpochMilli());

        ChatMessage savedChatMessage = chatMessageRepo.save(chatMessage);

        SocketDTO socketMessage = new SocketDTO("message", savedChatMessage);

        socketService.sendToAll(socketMessage);
        return savedChatMessage.getId() != null;
    }
}
