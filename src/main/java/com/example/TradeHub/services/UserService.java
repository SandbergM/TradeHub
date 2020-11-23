package com.example.TradeHub.services;

import com.example.TradeHub.entities.User;
import com.example.TradeHub.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

   /* @Autowired
    PasswordEncoder passwordEncoder;*/

    public User postNewUser(User user){
        var userWithEmailExists = userRepo.findByEmail(user.getEmail()).orElse(null);
        if(userWithEmailExists == null){
            User newUser = new User();
            System.out.println("Create new user");
         //   var adressExists = addressService.checkIfAddressExists(user.getAddress());
            // if(addressExists = null){
            // var savedAddress = addressService.save(user.getAddress())
            //user.setAddress(addressService.getById(savedAddress.getId())) }
           // user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepo.save(user);
            return user;
        }
        else{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An user with that email already exists");
        }
    }

    public void updateUser(String id, User user){
        var foundUser = userRepo.findById(id).orElse(null);
        if(foundUser == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id " + id);
        }
        else{
            user.setId(id);
            //if(user.company != null){
            // var companyExists = companyService.checkIfCompanyExists(user.getCompany());
            // if(companyExists = null){
            // var savedCompany = companyService.save(user.getCompany)
            // user.setCompany(companyService.getByName(user.getCompany.getName())}
            //user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepo.save(user);

        }
    }
}
