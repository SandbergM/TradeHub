package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.entities.Company;
import com.example.TradeHub.entities.User;
import com.example.TradeHub.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/whoami")
    @Operation( summary = "Fetch the current authenticated User  - Authentication required" )
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema( implementation = User.class )) }),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content })
    })
    public ResponseEntity<User> whoami(HttpServletRequest req, HttpServletResponse res){
        User user = userService.getCurrentUser();
        if(user==null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/logout")
    @Operation( summary = "Logout the current authenticated User" )
    private ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null) {
                new SecurityContextLogoutHandler().logout(request, response, authentication);
            }
        } catch (Exception err) {}
        return new ResponseEntity<>("Logged out",HttpStatus.RESET_CONTENT);
    }

    @PostMapping
    @Operation( summary = "Register a new User" )
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema( implementation = User.class )) }),
            @ApiResponse(responseCode = "403", description = "Bad Request",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content })
    })
    public ResponseEntity<User> addUser(@RequestBody User user){
        return ResponseEntity.ok(userService.postNewUser(user));
    }

    @PutMapping
    @Operation( summary = "Update ONE User with a Company - Authentication required" )
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema( implementation = ChatMessage.class )) }),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = { @Content }),
            @ApiResponse(responseCode = "403", description = "Bad Request",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content })
    })
    public void updateUserWithCompany(
            @RequestBody Company company
    ){
        userService.updateUser(company);
    }

}


