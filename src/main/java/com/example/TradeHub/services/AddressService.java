package com.example.TradeHub.services;

import com.example.TradeHub.entities.Address;
import com.example.TradeHub.repositories.AddressRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * <Description>
 *
 * @author Martin Hellström
 * @version 1.0
 * @since 11/23/2020
 */

@Service
public class AddressService {

    @Autowired
    AddressRepo addressRepo;

    public List<Address> auctionCriteriaSearch(String id, String streetName, String postalCode, String city){
        List<Address> addresses = addressRepo.addressCriteriaSearch(id,streetName,postalCode,city).orElse(new ArrayList<>());
        if(addresses.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
        }

        return addresses;
    }

    public List<Address>findById(String id){
        List<Address> addresses = addressRepo.findById(id).orElse(null);
        if(addresses == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
        }

        return addresses;
    }

    public Address postNewAddress(Address address){
        Address newAddress = addressRepo.save(address).orElse(null);

        if(newAddress == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Could not process the request");
        }

        return newAddress;
    }

    public void deleteAddress(String id){
        try{
            addressRepo.deleteById(id);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
        }

    }
}
