package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.User;
import com.example.TradeHub.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/users")
public class UserController {

@Autowired
    private UserService userService;

@PostMapping
public ResponseEntity<User> addUser(@RequestBody User user){
    return ResponseEntity.ok(userService.postNewUser(user));
}

@PutMapping
public void updateUser(@RequestBody User user){
    userService.updateUser(user);
}
}


