package com.example.TradeHub.repositories;

import com.example.TradeHub.entities.Image;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepo  extends MongoRepository<Image, String> {
}
