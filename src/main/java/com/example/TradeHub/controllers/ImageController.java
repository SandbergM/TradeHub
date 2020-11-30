package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.Image;
import com.example.TradeHub.services.ImageService;
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
    public List<Image> handleFileUpload(@RequestParam List<MultipartFile> files) {
        return imageService.save(files);
    }

}