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

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private CompanyService companyService;


    @Autowired
    PasswordEncoder passwordEncoder;

    public User postNewUser(User user) {
        var userWithEmailExists = userRepo.findByEmail(user.getEmail()).orElse(null);
        if (userWithEmailExists == null) {
            System.out.println("Create new user");
            //   var adressExists = addressService.checkIfAddressExists(user.getAddress());
            // if(addressExists = null){
            // var savedAddress = addressService.save(user.getAddress())
            //user.setAddress(addressService.getById(savedAddress.getId())) }
            // user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepo.save(user);
            return user;
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An user with that email already exists");
        }
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    public User getCurrentUser() {
        return myUserDetailsService.getCurrentUser();
    }


    public void updateUser(String id, User user) {
        var foundUser = userRepo.findById(id).orElse(null);
        if (foundUser == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id " + id);
        } else {
            user.setId(id);
            if (user.getCompany() != null) {
                var companyExists = companyService.registerCompany(user.getCompany());
                user.setCompany(companyExists);
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userRepo.save(user);

            }

        }
    }
}
