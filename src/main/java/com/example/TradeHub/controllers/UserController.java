package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.User;
import com.example.TradeHub.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/v1/user")
public class UserController {

@Autowired
    private UserService userService;

public ResponseEntity<User> addUser(@RequestBody User user){
    return ResponseEntity.ok(userService.saveUser(user));
}

}
