package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.Company;
import com.example.TradeHub.entities.User;
import com.example.TradeHub.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/whoami")
    public ResponseEntity<User> whoami(){
        User user = userService.getCurrentUser();
        if(user==null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(user);
    }
    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user){
        return ResponseEntity.ok(userService.postNewUser(user));
    }

    @PutMapping
    public void updateUserWithCompany(@RequestBody Company company){
        userService.updateUser(company);
    }
}


