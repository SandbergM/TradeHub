package com.example.TradeHub.services;

import com.example.TradeHub.dtos.SocketDTO;
import com.example.TradeHub.entities.Bid;
import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.entities.Room;
import com.example.TradeHub.entities.SocketPayload;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;


@Service
public class SocketService {

    @Autowired
    ChatMessageService chatMessageService;
    ObjectMapper objectMapper = new ObjectMapper();

    private final Map<String, List<WebSocketSession>> rooms = new ConcurrentHashMap<>();
    private final Map<String, List<String>> activeSessions = new ConcurrentHashMap<>();

    public void sendToAll(SocketPayload socketPayload) throws JsonProcessingException {
        TextMessage msg = new TextMessage(objectMapper.writeValueAsString(socketPayload));
        for (WebSocketSession webSocketSession : rooms.get(socketPayload.getTarget())) {
            try {
                webSocketSession.sendMessage(msg);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void clearSessions(WebSocketSession session){
        for (String mySession : activeSessions.get(session.getId())) {
            removeSession(session, new Room(mySession));
        }
        activeSessions.remove(session.getId());
    }

    public void addSession(WebSocketSession session, Room room) {
        activeSessions.computeIfAbsent(session.getId(), k -> new CopyOnWriteArrayList<>());
        if(room.getRoomId() != null){
            rooms.computeIfAbsent( room.getRoomId(), k -> new CopyOnWriteArrayList<>());
            rooms.get(room.getRoomId()).add(session);
            activeSessions.get(session.getId()).add(room.getRoomId());
        }
    }

    public void removeSession(WebSocketSession session, Room room) {
        System.out.println("Left room : " + room.getRoomId());
        rooms.get(room.getRoomId()).removeIf( s -> s == session);
        System.out.println(rooms.get(room.getRoomId()).toString());
    }

    public void saveNewMessage(ChatMessage chatMessage) {
        chatMessageService.postNewMessage(chatMessage);
    }

    public void messageHandler(WebSocketSession session, TextMessage message) throws JsonProcessingException {
        SocketDTO socketDTO = objectMapper.readValue(message.getPayload(), SocketDTO.class);
        switch (socketDTO.action) {
            case "message":
                saveNewMessage(convertPayload(socketDTO.payload, ChatMessage.class));
                break;
            case "connection":
                System.out.println("User connected");
                break;
            case "bid":
                Bid bid = convertPayload(socketDTO.payload, Bid.class);
                String action = "bid";
                SocketPayload payload = new SocketPayload( action, session.getId(), bid );
                sendToAll( payload );
                break;
            case "join-room":
                addSession(session, convertPayload(socketDTO.payload, Room.class) );
                break;
            case "leave-room":
                removeSession(session, convertPayload(socketDTO.payload, Room.class) );
                break;
            case "user-status":
                break;
            default:
                System.out.println("Could not read action: " + socketDTO.action);
        }

    }

    private <T> T convertPayload(Object object, Class<T> type) {
        ObjectMapper objectMapper = new ObjectMapper();
        T t = null;
        try {
            t = objectMapper.readValue(objectMapper.writeValueAsString(object), type);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return t;
    }

}

