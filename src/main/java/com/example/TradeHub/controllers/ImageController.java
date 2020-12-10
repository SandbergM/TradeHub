package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.entities.Image;
import com.example.TradeHub.services.ImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class ImageController {

    @Autowired
    ImageService imageService;

    @PostMapping("/static/uploads")
    @Operation( summary = "Upload one or more Images - Authentication required" )
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema( implementation = Image.class )) }),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = { @Content }),
            @ApiResponse(responseCode = "403", description = "Bad Request",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content })
    })
    public List<Image> uploadImage(@RequestParam List<MultipartFile> files) {
        return imageService.save(files);
    }

}