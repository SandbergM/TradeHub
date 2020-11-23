package com.example.TradeHub.repositories;

import com.example.TradeHub.entities.Company;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.Optional;

public class CompanyRepo  {

    private final MongoTemplate mongoTemplate;

    public CompanyRepo(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }

    public Optional<Company> criteriaSearch(Company company){
        Query query = new Query()
                .addCriteria(Criteria.where("name").is(company.getName()))
                .addCriteria(Criteria.where("organizationNumber").is(company.getOrganizationNumber()));
        return Optional.ofNullable(mongoTemplate.findOne(query, Company.class));
    }

    public Optional<Company> save(Company company){
        return Optional.of(mongoTemplate.save(company));
    }



}
