package com.example.TradeHub.repositories;

import com.example.TradeHub.entities.ChatMessage;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ChatMessageRepo  {

    private final int PAGE_LIMIT = 20;

    private final MongoTemplate mongoTemplate;

    public ChatMessageRepo(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }


    public Optional<List<ChatMessage>> findByRoomId(int page, String roomId){
        Query query = new Query();

        query.limit(PAGE_LIMIT).skip(PAGE_LIMIT * ( page - 1));
        query.with(Sort.by("timestamp").descending());
        query.addCriteria(Criteria.where("roomId").is(roomId));

        return Optional.of(mongoTemplate.find(query, ChatMessage.class));
    }

    public Optional<ChatMessage> save(ChatMessage chatMessage){
        return Optional.of(mongoTemplate.save(chatMessage));
    }

}
