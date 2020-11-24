package com.example.TradeHub.repositories;

import com.example.TradeHub.entities.Address;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class AddressRepo {

    private final MongoTemplate mongoTemplate;

    public AddressRepo(MongoTemplate mongoTemplate){ this.mongoTemplate = mongoTemplate;}

    public Optional<Address> addressCriteriaSearch(String streetName, String postalCode, String city, String country){
        Query query = new Query();

        if(!streetName.equals("")){query.addCriteria(Criteria.where("streetName").regex(streetName));}
        if(!postalCode.equals("")){query.addCriteria(Criteria.where("postalCode").is(postalCode));}
        if(!city.equals("")){query.addCriteria(Criteria.where("city").is(city));}


        return Optional.ofNullable(mongoTemplate.findOne(query, Address.class));
    }

    public Optional<Address> findById(String id){
        Query query = new Query().addCriteria(Criteria.where("id").is(id));
        return Optional.ofNullable(mongoTemplate.findOne(query, Address.class));
    }

    public Optional<Address>save(Address address){ return Optional.of(mongoTemplate.save(address));}

    public void deleteById(String id){
        Query query = new Query().addCriteria(Criteria.where("id").is(id));
        mongoTemplate.findAndRemove(query, Address.class);
    }
}


