package com.example.TradeHub.repositories;

import com.example.TradeHub.entities.Room;
import com.example.TradeHub.entities.User;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class RoomRepo {

    private final MongoTemplate mongoTemplate;

    public RoomRepo(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }

    public Optional<Room> findRoomByParticipants(User sender, User receiver){
        List<String> users = new ArrayList<>();
        users.add(sender.getId());
        users.add(receiver.getId());
        Query query = new Query()
                .addCriteria(Criteria.where("participants").all(users));
        return Optional.ofNullable(mongoTemplate.findOne(query, Room.class));
    }

    public Optional<List<Room>> findRooms(User user){
        Query query = new Query().addCriteria(Criteria.where("participants").all(user.getId()));
        return Optional.of(mongoTemplate.find(query, Room.class));
    }

    public Optional<Room> save( Room room ){
        return Optional.of(mongoTemplate.save(room));
    }

}
