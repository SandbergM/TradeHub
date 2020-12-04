package com.example.TradeHub.repositories;

import com.example.TradeHub.entities.Auction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public class AuctionRepo {

    private final int PAGE_LIMIT = 50;

    private final MongoTemplate mongoTemplate;

    public AuctionRepo(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }

    public Optional<List<Auction>> auctionCriteriaSearch(int page, String title, String id, String sortBy, Boolean active){
        Query query = new Query();
        long currentTime = Instant.now().getEpochSecond();
        query.limit(PAGE_LIMIT).skip(PAGE_LIMIT * ( page - 1));
        if(!id.equals("")){ query.addCriteria(Criteria.where("_id").is(id)); }
        if(active){ query.addCriteria(Criteria.where("timestamp").gt(currentTime)); }
        if(!active){ query.addCriteria(Criteria.where("timestamp").lt(currentTime)); }
        if(!title.equals("")){query.addCriteria(Criteria.where("title").regex(title, "i"));}

        return Optional.of(mongoTemplate.find(query, Auction.class));
    }

    public Optional<List<Auction>> findBySellerId(String id){
        Query query = new Query()
                .addCriteria(Criteria.where("seller").is(id));
        return Optional.of(mongoTemplate.find(query, Auction.class));
    }

    public Optional<List<Auction>> findByBuyerId(String id){
        Query query = new Query()
                .addCriteria(Criteria.where("bidder").is(id));
        return Optional.of(mongoTemplate.find(query, Auction.class));
    }


    public Optional<Auction> save(Auction auction){
        return Optional.of(mongoTemplate.save(auction));
    }

    public void deleteById(String id){
        Query query = new Query().addCriteria(Criteria.where("_id").is(id));
        mongoTemplate.findAndRemove(query, Auction.class);
    }

    public Optional<Auction> findById(String id){
        return Optional.ofNullable(mongoTemplate.findById(id, Auction.class));
    }

}
