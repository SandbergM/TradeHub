package com.example.TradeHub.repositories;

import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.entities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatMessageRepo extends MongoRepository<ChatMessage, String> {

    Optional<List<ChatMessage>> findByRoomId(String roomId);
}
