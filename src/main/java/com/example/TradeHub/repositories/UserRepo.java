package com.example.TradeHub.repositories;

import com.example.TradeHub.entities.User;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserRepo {
    private final MongoTemplate mongoTemplate;

    public UserRepo(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }
    public Optional<User> findByEmail(String email){
        Query query = new Query().addCriteria(Criteria.where("email").is(email));
        return Optional.ofNullable(mongoTemplate.findOne(query, User.class));
    }
    public Optional<User> save(User user){
        return Optional.of(mongoTemplate.save(user));
    }
    public Optional<User> findById(String id){
        return Optional.ofNullable(mongoTemplate.findById(id, User.class));
    }
}
