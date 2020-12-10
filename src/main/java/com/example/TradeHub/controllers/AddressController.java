package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.Address;
import com.example.TradeHub.services.AddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/addresses")
public class AddressController {

    @Autowired
    AddressService addressService;

    @GetMapping( produces = "application/json" )
    @Operation( summary = "Fetch ONE Address with various optional parameters" )
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Address.class)) }),
            @ApiResponse(responseCode = "404", description = "Not Found",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content }),
    })
    public ResponseEntity<Address> getAddress(
            @Parameter(description="Street name, String" , required = false)
            @RequestParam( value = "streetName" , defaultValue = "") String streetName,
            @Parameter(description="Postal code, String" , required = false)
            @RequestParam( value = "postalCode" , defaultValue = "") String postalCode,
            @Parameter(description="City, String, String" , required = false)
            @RequestParam( value = "city" , defaultValue = "") String city,
            @Parameter(description="Country, String" , required = false)
            @RequestParam( value = "country" , defaultValue = "") String country
    ){
        Address addresses = addressService.thisAddressCriteriaSearch(streetName,postalCode,city,country);
        if(addresses != null){
            System.out.println(addresses.getStreetName());
        }
        assert addresses != null;
        return ResponseEntity.ok(addresses);
    }

    @GetMapping("/{id}")
    @Operation( summary = "Fetching ONE Address using id" )
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Address.class)) }),
            @ApiResponse(responseCode = "404", description = "Not Found",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content }),
    })
    public ResponseEntity<Address> findById(
            @Parameter(description="Address id, String ( MongoDb uuid )" , required = true)
            @PathVariable String id
    ){
        return ResponseEntity.ok(addressService.findById(id));
    }

    @Operation( summary = "Saving/Posting ONE new Address - Authentication required" )
    @ApiResponses( value = {
            @ApiResponse(responseCode = "201", description = "Created",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Address.class)) }),
            @ApiResponse(responseCode = "401", description = "Bad Request",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content }),
    })
    @PostMapping( consumes = "application/json", produces = "application/json" )
    public ResponseEntity<Address> saveAddress(@RequestBody Address address){
        return ResponseEntity.ok(addressService.postNewAddress(address));
    }


    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    @Operation( summary = "Delete ONE Address using an Address id - Admin-role required" )
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Address.class)) }),
            @ApiResponse(responseCode = "404", description = "Not Found",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content }),
    })
    public void deleteAddress(
            @Parameter(description="Address id, String ( MongoDb uuid )" , required = true)
            @PathVariable String id
    ){
        addressService.deleteAddress(id);
    }
}
