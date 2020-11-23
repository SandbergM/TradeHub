package com.example.TradeHub.repositories;

import com.example.TradeHub.entities.User;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepo {
    private final MongoTemplate mongoTemplate;

    public UserRepo(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }
    public Optional<List<User>> findByEmail(String email){
        Query query = new Query().addCriteria(Criteria.where("email").is(email));
        return Optional.of(mongoTemplate.find(query, User.class));
    }
    public Optional<User> save(User user){
        return Optional.of(mongoTemplate.save(user));
    }


}
