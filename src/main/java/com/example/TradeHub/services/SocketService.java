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
    private final Map<String, WebSocketSession> sessionTranslations = new ConcurrentHashMap<>();

    public void sendToAll(SocketPayload socketPayload) {
        TextMessage msg = null;
        try {
            msg = new TextMessage(objectMapper.writeValueAsString(socketPayload));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
            for (WebSocketSession webSocketSession : activeRooms.get(socketPayload.getTarget()).getSessions()) {
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
        if(room.getId() != null){
            activeRooms.computeIfAbsent( room.getId(), k -> new Room( new ArrayList<WebSocketSession>()));
            activeRooms.get(room.getId()).getSessions().add(session);
            activeSessions.get(session.getId()).add(room.getId());
        }
    }

    public void removeSession(WebSocketSession session, Room room) {
        activeRooms.get(room.getId()).getSessions().removeIf(s -> s == session);
    }

    public void messageHandler(WebSocketSession session, TextMessage message) throws JsonProcessingException {
        SocketDTO socketDTO = objectMapper.readValue(message.getPayload(), SocketDTO.class);
        switch (socketDTO.action) {
            case "connection":
                sessionTranslations.put(convertPayload(socketDTO.payload, User.class).getId(), session);
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

    public void customSendToAll(SocketPayload payload){

        if(activeRooms.get(payload.getTarget()) == null){
            var newRoom = new Room(payload.getTarget(), new ArrayList<WebSocketSession>());
            activeRooms.put(payload.getTarget(), newRoom);
        }

        // We get the list with the current sessions in it
        var currentParticipants = activeRooms.get(payload.getTarget()).getSessions();
        for(var part : payload.getRoom().getParticipants()){
            var session = userIdToSessionIdTranslation(part);
            /*
            Conditions that needs to be met :
            The session is not allowed to be null
            The session needs to be active AKA the user is online, sending to a dead session = *BOOM*
            The room doesn't already have the session in it, duplicates sessions means duplicate messages
             */
            if( session != null && sessionIsActive( session ) && !currentParticipants.contains( session ) ){
                /*
                Use the addSession to append the room to the users list of rooms, this is needed
                when the user disconnects since we need to exit all of the activeRooms
                because if we leave him/her in them and someone tries to send them a message... *BOOM* again :)
                 */
                addSession( session, new Room( payload.getTarget() ));
            }
        }
        // Payload is ready to be sent, all of the sessions and rooms already know what to do at this point
       sendToAll(payload);
    }

    // Gets us the current session associated with a specific user
    public WebSocketSession userIdToSessionIdTranslation(String userId){
        return sessionTranslations.get(userId);
    }

    // Quick easy clean way to check if the session exists or not
    public Boolean sessionIsActive(WebSocketSession webSocketSession){
        return activeSessions.get(webSocketSession.getId()) != null;
    }

}

