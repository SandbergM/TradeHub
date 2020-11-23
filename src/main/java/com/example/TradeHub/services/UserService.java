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
            System.out.println("Create new user");
           // user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepo.save(user);
            return user;
        }
        else{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An user with that email already exists");
        }
    }
}
