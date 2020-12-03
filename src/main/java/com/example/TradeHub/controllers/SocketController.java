package com.example.TradeHub.controllers;

import com.example.TradeHub.dtos.SocketDTO;
import com.example.TradeHub.entities.Bid;
import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.entities.Room;
import com.example.TradeHub.services.SocketService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

/**
 * <Description>
 *
 * @author Martin Hellström
 * @version 1.0
 * @since 11/30/2020
 */

@Controller
public class SocketController extends TextWebSocketHandler {

    ObjectMapper objectMapper = new ObjectMapper();

    private SocketService socketService;
    public void setSocketService(SocketService socketService) {
        this.socketService = socketService;
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        System.out.println("Received msg: " + message.getPayload());
        SocketDTO socketDTO = objectMapper.readValue(message.getPayload(), SocketDTO.class);
        switch (socketDTO.action) {
            case "message":
                ChatMessage msg = convertPayload(socketDTO.payload, ChatMessage.class);
                socketService.saveNewMessage(msg);
                break;
            case "connection":
                System.out.println("User connected");
                break;
            case "bid":
                socketService.sendToAll(
                        convertPayload(socketDTO.payload, Bid.class),
                        convertPayload(socketDTO.payload, Bid.class).getAuctionId());
                break;
            case "join-room":
                socketService.addSession(session, convertPayload(socketDTO.payload, Room.class));
                break;
            case "leave-room":
                socketService.removeSession(session, convertPayload(socketDTO.payload, Room.class));
                break;
            case "user-status":
                break;
            default:
                System.out.println("Could not read action: " + socketDTO.action);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println("Connected");
        //socketService.addSession(session, );
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        System.out.println("Disconnected");
        socketService.clearSessions(session);
    }

    private <T> T convertPayload(Object object, Class<T> type) {
        T t = null;
        try {
            t = objectMapper.readValue(objectMapper.writeValueAsString(object), type);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return t;
    }
}