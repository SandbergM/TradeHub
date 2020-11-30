package com.example.TradeHub.repositories;

import com.example.TradeHub.entities.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepo extends MongoRepository<ChatMessage, String> {
}
