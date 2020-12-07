package com.example.TradeHub.services;

import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.entities.Room;
import com.example.TradeHub.entities.SocketPayload;
import com.example.TradeHub.entities.User;
import com.example.TradeHub.repositories.ChatMessageRepo;
import com.example.TradeHub.repositories.RoomRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
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

    @Autowired
    UserService userService;

    @Autowired
    RoomRepo roomRepo;

    public HashMap<String, List<ChatMessage>> getAllChatMessages() {
        var rooms = roomRepo.findRooms(userService.getCurrentUser()).orElse(new ArrayList<>());
        var foundMessages = new HashMap<String, List<ChatMessage>>();
        for (Room room: rooms) {
            var messages = chatMessageRepo.findByRoomId(room.getId()).orElse(null);
            System.out.println(messages);
            if(messages != null){
                foundMessages.put(room.getId(), messages);
            }
        }
        return foundMessages; }

    public ChatMessage postNewMessage(ChatMessage chatMessage) {
        User sender = userService.getCurrentUser();
        User receiver = userService.findById(chatMessage.getReceiver().getId());
        if(receiver == null){ System.out.println("Här kommer det kastas grejer!"); }
        var room = roomRepo.findRoomByParticipants(sender, receiver).orElse(null);

        if(room == null){
            ArrayList<String> participants = new ArrayList<>();
            participants.add(sender.getId());
            participants.add(receiver.getId());
            var chatRoom = new Room();
            chatRoom.setParticipants(participants);
            room = roomRepo.save(chatRoom).orElse( null );
            if( room == null ){
                System.out.println("Här kommer det kastas grejer!");
            }
        }

        chatMessage.setTimestamp(Instant.now().toEpochMilli());
        chatMessage.setSender(sender);
        chatMessage.setReceiver(receiver);
        chatMessage.setRoomId(room.getId());
        ChatMessage savedChatMessage = chatMessageRepo.save(chatMessage);
        SocketPayload socketPayload = new SocketPayload("chat-message", room, savedChatMessage );
        socketService.customSendToAll(socketPayload);

        return savedChatMessage;
    }
}
