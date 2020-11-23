package com.example.TradeHub.repositories;

import com.example.TradeHub.entities.Address;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * <Description>
 *
 * @author Martin Hellström
 * @version 1.0
 * @since 11/23/2020
 */

@Repository
public class AddressRepo {

    private final MongoTemplate mongoTemplate;

    public AddressRepo(MongoTemplate mongoTemplate){ this.mongoTemplate = mongoTemplate;}

    public Optional<List<Address>> addressCriteriaSearch(String id, String streetName, String postalCode, String city){
        Query query = new Query();

        if(!streetName.equals("")){query.addCriteria(Criteria.where("streetName").regex(streetName));}
        if(!postalCode.equals("")){query.addCriteria(Criteria.where("postalCode").is(postalCode));}
        if(!city.equals("")){query.addCriteria(Criteria.where("city").is(city));}
        if(!id.equals("")){query.addCriteria(Criteria.where("id").is(id));}

        return Optional.of(mongoTemplate.find(query, Address.class));
    }

    public Optional<Address> findById(String id){
        Query query = new Query().addCriteria(Criteria.where(id).is(id));

        return Optional.ofNullable(mongoTemplate.findOne(query, Address.class));
    }

    public Optional<Address>save(Address address){ return Optional.of(mongoTemplate.save(address));}

    public void deleteById(String id){
        Query query = new Query().addCriteria(Criteria.where("id").is(id));

        mongoTemplate.findAndRemove(query, Address.class);
    }
}


