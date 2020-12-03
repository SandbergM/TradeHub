package com.example.TradeHub.services;

import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.entities.Room;
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

/**
 * <Description>
 *
 * @author Martin Hellström
 * @version 1.0
 * @since 11/30/2020
 */

@Service
public class SocketService {

    //    Gson gson = new Gson();
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    ChatMessageService chatMessageService;

    private final Map<String, List<WebSocketSession>> rooms = new ConcurrentHashMap<>();
    private final Map<String, List<String>> activeSessions = new ConcurrentHashMap<>();

    public void sendToOne(WebSocketSession webSocketSession, String message) throws IOException {
        webSocketSession.sendMessage(new TextMessage(message));
    }

    public void sendToOne(WebSocketSession webSocketSession, Object obj) throws IOException {
        String json = objectMapper.writeValueAsString(obj);
        sendToOne(webSocketSession, json);
    }

    public void sendToAll(Object obj, String room) throws JsonProcessingException {
        TextMessage msg = new TextMessage(objectMapper.writeValueAsString(obj));
        var x = rooms.get(room);
        for (WebSocketSession webSocketSession : x) {
            System.out.println(webSocketSession);
            try {
                webSocketSession.sendMessage(msg);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void clearSessions(WebSocketSession session){
        var mySessions = activeSessions.get(session.getId());
        if(mySessions == null) return;
        for (String mySession : mySessions) {
            removeSession(session, new Room(mySession));
        }
        activeSessions.remove(session.getId());
    }

    public void addSession(WebSocketSession session, Room room) {

        activeSessions.computeIfAbsent(session.getId(), k -> new ArrayList<>());

        System.out.println("Joined room : " + room.getRoomId());
        if(rooms.get(room.getRoomId()) == null){
            rooms.put(room.getRoomId(), new CopyOnWriteArrayList<>());
        }
        var tempList = rooms.get(room.getRoomId());
        tempList.add(session);
        rooms.replace(room.getRoomId(), tempList);
        var arr = activeSessions.get(session.getId());
        arr.add(room.getRoomId());
        activeSessions.replace(session.getId(), arr);
    }

    public void removeSession(WebSocketSession session, Room room) {
        System.out.println("Left room : " + room.getRoomId());
        var tempList = rooms.get(room.getRoomId());
        tempList.removeIf( s -> s == session);
        rooms.replace(room.getRoomId(), tempList);
        System.out.println(rooms.get(room.getRoomId()).toString());
    }

    public void saveNewMessage(ChatMessage chatMessage) {
        chatMessageService.postNewMessage(chatMessage);
    }
}

