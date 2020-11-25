package com.example.TradeHub.services;

import com.example.TradeHub.entities.Address;
import com.example.TradeHub.repositories.AddressRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AddressService {

    @Autowired
    AddressRepo addressRepo;

    public Address thisAddressCriteriaSearch( String streetName, String postalCode, String city){
        Address addresses = addressRepo.addressCriteriaSearch(streetName,postalCode,city).orElse(null);
        if(addresses != null){
            return addresses;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
    }

    public Address findById(String id){
        Address addresses = addressRepo.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("Could not find the user by id %s.", id)));
        return addresses;
    }

    public Address postNewAddress(Address address){
        Address dbAddresses = addressRepo.addressCriteriaSearch(
                address.getStreetName(),
                address.getPostalCode(),
                address.getCity()).orElse(null);

        if(dbAddresses != null){
            return dbAddresses;
        }
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
