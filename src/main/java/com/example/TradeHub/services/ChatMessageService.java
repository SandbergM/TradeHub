package com.example.TradeHub.services;

import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.entities.Room;
import com.example.TradeHub.entities.SocketPayload;
import com.example.TradeHub.entities.User;
import com.example.TradeHub.repositories.ChatMessageRepo;
import com.example.TradeHub.repositories.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
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
    ChatMessageRepo conversationRepo;

    @Autowired
    SocketService socketService;

    @Autowired
    UserService userService;

    @Autowired
    RoomRepo roomRepo;

    public List<ChatMessage> getAllChatMessages() { return conversationRepo.findAll(); }

    public boolean postNewMessage(ChatMessage chatMessage){

        User sender = userService.getCurrentUser();
        User receiver = userService.findById(chatMessage.getReceiver().getId());

        if(receiver == null){ System.out.println("Här kommer det kastas grejer!"); }
        var room = roomRepo.findRoomByParticipants(sender, receiver);

        if(room.isEmpty()){
            ArrayList<String> participants = new ArrayList<>();
            participants.add(sender.getId());
            participants.add(receiver.getId());
            var chatRoom = new Room();
            chatRoom.setParticipants(participants);
            roomRepo.save(chatRoom);
        }

        chatMessage.setTimestamp(Instant.now().toEpochMilli());
        chatMessage.setSender(sender);
        ChatMessage savedChatMessage = conversationRepo.save(chatMessage);
        //SocketPayload socketPayload = new SocketPayload();
        //socketService.sendToAll();
        return true;
    }
}
