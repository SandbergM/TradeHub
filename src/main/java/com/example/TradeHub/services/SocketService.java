package com.example.TradeHub.services;

import com.example.TradeHub.dtos.SocketDTO;
import com.example.TradeHub.entities.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class SocketService {

    @Autowired
    ChatMessageService chatMessageService;
    ObjectMapper objectMapper = new ObjectMapper();

    private final Map<String, Room> activeRooms = new ConcurrentHashMap<>();
    private final Map<String, List<String>> activeSessions = new ConcurrentHashMap<>();
    private final Map<String, String> sessionTranslations = new ConcurrentHashMap<>();

    public void sendToAll(SocketPayload socketPayload) {
        System.out.println("Hello from line 31");
        var x = activeRooms.get(socketPayload.getTarget()).getSessions();
        TextMessage msg = null;
        try {
            msg = new TextMessage(objectMapper.writeValueAsString(socketPayload));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println(msg);
        if(x != null){
            for (WebSocketSession webSocketSession : x) {
                try {
                    webSocketSession.sendMessage(msg);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        }



    public String userIdToSessionIdTranslation(String userId){
        return sessionTranslations.get(userId);
    }

    public void clearSessions(WebSocketSession session){
        for (String mySession : activeSessions.get(session.getId())) {
            removeSession(session, new Room(mySession));
        }
        activeSessions.remove(session.getId());
    }

    public void addSession(WebSocketSession session, Room room) {
        activeSessions.computeIfAbsent(session.getId(), k -> new CopyOnWriteArrayList<>());
        if(room.getId() != null){
            activeRooms.computeIfAbsent( room.getId(), k -> new Room( new ArrayList<WebSocketSession>()));
            activeRooms.get(room.getId()).getSessions().add(session);
            activeSessions.get(session.getId()).add(room.getId());
        }
    }

    public void removeSession(WebSocketSession session, Room room) {
        System.out.println("Left room : " + room.getId());
        activeRooms.get(room.getId()).getSessions().removeIf(s -> s == session);
        System.out.println(activeRooms.get(room.getId()).toString());
    }

    public void messageHandler(WebSocketSession session, TextMessage message) throws JsonProcessingException {
        SocketDTO socketDTO = objectMapper.readValue(message.getPayload(), SocketDTO.class);
        switch (socketDTO.action) {
            case "connection":
                System.out.println("Me is connect, yes");
                sessionTranslations.put(convertPayload(socketDTO.payload, User.class).getId(), session.getId());
                break;
            case "join-room":
                System.out.println("Me is join room, yes");
                addSession(session, convertPayload(socketDTO.payload, Room.class) );
                break;
            case "leave-room":
                System.out.println("Me is leave room, yes");
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

    public void customSendToAll(SocketPayload payload){

       var x = sessionTranslations.get(payload.getChatMessage().getReceiver().getId());
       var y =  sessionTranslations.get(payload.getChatMessage().getSender().getId());

       if(activeRooms.get(payload.getTarget()) == null){
           activeRooms.put(payload.getTarget(), new Room());
       }
       var participants = new ArrayList<String>();
       participants.add(y);

       if(x != null){
           participants.add(x);
       }

       var room = new Room();
       room.setParticipants(participants);
       activeRooms.replace(payload.getTarget(),room);

       sendToAll(payload);
    }

}

