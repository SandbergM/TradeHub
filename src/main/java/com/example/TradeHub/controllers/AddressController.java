package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.Address;
import com.example.TradeHub.services.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/addresses")
public class AddressController {

    @Autowired
    AddressService addressService;

    @GetMapping
    public ResponseEntity<Address> getAddresses(
            @RequestParam( value = "streetName" , defaultValue = "") String streetName,
            @RequestParam( value = "postalCode" , defaultValue = "") String postalCode,
            @RequestParam( value = "city" , defaultValue = "") String city,
            @RequestParam( value = "country" , defaultValue = "") String country
    ){
        Address addresses = addressService.thisAddressCriteriaSearch(streetName, postalCode, city, country);
        return ResponseEntity.ok(addresses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Address> findById(@PathVariable String id){
        return ResponseEntity.ok(addressService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Address> saveAddress(@RequestBody Address address){
        return ResponseEntity.ok(addressService.postNewAddress(address));
    }

    @DeleteMapping("/{id}")
    public void deleteAddress(@PathVariable String id){
        addressService.deleteAddress(id);
    }
}
