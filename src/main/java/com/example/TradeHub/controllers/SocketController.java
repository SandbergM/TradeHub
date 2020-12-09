package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.Room;
import com.example.TradeHub.services.SocketService;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

@Controller
public class SocketController extends TextWebSocketHandler {

    private SocketService socketService;
    public void setSocketService(SocketService socketService) {
        this.socketService = socketService;
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        socketService.messageHandler(session, message);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        socketService.addSession(session, new Room());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        System.out.println("Disconnected");
        socketService.clearSessions(session);
    }

}