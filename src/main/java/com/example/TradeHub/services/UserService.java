package com.example.TradeHub.services;

import com.example.TradeHub.entities.Company;
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
    private AddressService addressService;

    @Autowired
    private AuctionService auctionService;

    @Autowired
    PasswordEncoder passwordEncoder;

    public User postNewUser(User user) {
        System.out.println(user);
        var userWithEmailExists = userRepo.findByEmail(user.getEmail()).orElse(null);
        if (userWithEmailExists == null) {
            var address = addressService.postNewAddress(user.getAddress());
            user.setAddress(address);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepo.save(user);
            return user;
        } else {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "An user with that email already exists");
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

    public void updateUser(Company companyToAdd) {
        var user = this.getCurrentUser();
           if (companyToAdd.getName() != null && companyToAdd.getOrganizationNumber() != null) {
               if (!companyToAdd.getName().equals("") && !companyToAdd.getOrganizationNumber().equals("")) {
                   var company = companyService.registerCompany(companyToAdd);
                   user.setCompany(company);
                   userRepo.save(user);
               } else {
                   var newUser = new User();
                   newUser.setId(user.getId());
                   newUser.setEmail(user.getEmail());
                   newUser.setPassword(user.getPassword());
                   newUser.setFullName(user.getFullName());
                   newUser.setAddress(user.getAddress());
                   userRepo.save(newUser);
               }
           }
           else{
           throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Couldn't process the information");
           }
    }
}
