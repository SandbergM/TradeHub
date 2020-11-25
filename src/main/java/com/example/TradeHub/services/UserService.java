package com.example.TradeHub.services;

import com.example.TradeHub.entities.Auction;
import com.example.TradeHub.entities.User;
import com.example.TradeHub.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private AddressService addressService;


    @Autowired
    PasswordEncoder passwordEncoder;

    public User postNewUser(User user) {
        System.out.println(user);
        var userWithEmailExists = userRepo.findByEmail(user.getEmail()).orElse(null);
        if (userWithEmailExists == null) {
            System.out.println("Create new user");
            var address = addressService.postNewAddress(user.getAddress());
            user.setAddress(address);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepo.save(user);
            return user;
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An user with that email already exists");
        }
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }
    public User findById(String id) {
        return userRepo.findById(id).orElse(null);
    }

    public User getCurrentUser() {
        return myUserDetailsService.getCurrentUser();
    }

    public void addAuctionsToUser(Auction auction, User user){
    var auctionList = new ArrayList<>();
    if(user.getAuctions() != null){
    auctionList.add(user.getAuctions());
    }
    auctionList.add(auction);
    user.setAuctions(List.of(auction));
            System.out.println(user.getAuctions());
    //userRepo.save(user);

    }


    public void updateUser(User user) {
       if(this.getCurrentUser() != null) {
           if (user.getCompany() != null) {
               var company = companyService.registerCompany(user.getCompany());
               user.setCompany(company);
               userRepo.save(user);
           }
       }
    }
}
