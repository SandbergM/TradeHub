package com.example.TradeHub.repositories;

import com.example.TradeHub.entities.User;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.Optional;

public class UserRepo {
    private final MongoTemplate mongoTemplate;

    public UserRepo(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }
    public findAllByEmail(String email){
        var users = mongoTemplate.findAll(User.class);
    }
    public Optional<User> save(User user){
        return Optional.of(mongoTemplate.save(user));
    }


}
