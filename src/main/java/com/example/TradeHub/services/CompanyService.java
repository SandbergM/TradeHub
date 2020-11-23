package com.example.TradeHub.services;

import com.example.TradeHub.entities.Company;
import com.example.TradeHub.repositories.CompanyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CompanyService {

    @Autowired
    CompanyRepo companyRepo;

    public Company registerCompany(Company company){
        Company companyToRegister = companyRepo.criteriaSearch(company).orElse( null );
        if(companyToRegister == null){
            Company newCompany = companyRepo.save(company).orElse( null );
            if(newCompany == null){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Could not process the request");
            }
            return newCompany;
        }
        return companyToRegister;
    }

}
