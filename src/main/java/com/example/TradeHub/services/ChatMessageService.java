package com.example.TradeHub.services;

import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.entities.Room;
import com.example.TradeHub.entities.SocketPayload;
import com.example.TradeHub.entities.User;
import com.example.TradeHub.repositories.ChatMessageRepo;
import com.example.TradeHub.repositories.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

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

    public List<ChatMessage> getConversation(String roomId) {
        List<ChatMessage> messages =  chatMessageRepo.findByRoomId(1 ,roomId).orElse( new ArrayList<>() );
        if(messages.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found");
        }
        return messages;
    }

    public void postNewMessage(ChatMessage chatMessage) {
        User sender = userService.getCurrentUser();
        User receiver = userService.findById(chatMessage.getReceiver().getId());
        if( receiver == null ){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "A could not find receiver");
        }

        var room = roomRepo.findRoomByParticipants(sender, receiver).orElse(null);

        if(room == null){
            ArrayList<User> participants = new ArrayList<>();
            participants.add(sender);
            participants.add(receiver);
            var chatRoom = new Room();
            chatRoom.setParticipants(participants);
            room = roomRepo.save(chatRoom).orElse( null );
            if( room == null ){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Could not process the request");
            }
        }

        chatMessage.setTimestamp(Instant.now().toEpochMilli());
        chatMessage.setSender(sender);
        chatMessage.setReceiver(receiver);
        chatMessage.setRoomId(room.getId());
        ChatMessage savedChatMessage = chatMessageRepo.save(chatMessage).orElse(null);
        if(savedChatMessage == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Could not process the request");
        }
        SocketPayload socketPayload = new SocketPayload("chat-message", room, savedChatMessage );
        socketService.customSendToAll(socketPayload);
    }

    public Room getRoom(String receiverId) {
        User sender = userService.getCurrentUser();
        User receiver = userService.findById(receiverId);
        Room room = roomRepo.findRoomByParticipants( sender, receiver ).orElse(null);
        if( room == null){
            ArrayList<User> participants = new ArrayList<>();
            participants.add(sender);
            participants.add(receiver);
            room = roomRepo.save(new Room(participants)).orElse( null );
            if(room == null){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Could not process the request");
            }
        }
        return room;
    }

    public List<Room> getCurrentUsersRooms() {
        User user = userService.getCurrentUser();
        List<Room> rooms = roomRepo.findRooms(user).orElse( new ArrayList<>());
        if(rooms.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found");
        }
        return rooms;
    }

}
