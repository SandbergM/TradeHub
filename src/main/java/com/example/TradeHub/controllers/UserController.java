package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.Company;
import com.example.TradeHub.entities.User;
import com.example.TradeHub.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/whoami")
    public ResponseEntity<User> whoami(HttpServletRequest req, HttpServletResponse res){
        /*if(req.getCookies() != null) {
            List<Cookie> cookies = Arrays.stream(req.getCookies()).filter(c -> c.getName().equals("abc123")).collect(Collectors.toList());
            String reqCookieValue = cookies.get(0).getValue();

            System.out.println("cookie");
            System.out.println(reqCookieValue);
            res.addCookie(cookies.get(0));
        }
        else{
            Cookie cookie = new Cookie("abc123", UUID.randomUUID().toString());
            cookie.setHttpOnly(true);
            res.addCookie(cookie);

        }*/

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


