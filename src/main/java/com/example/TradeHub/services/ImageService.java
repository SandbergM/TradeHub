package com.example.TradeHub.services;

import com.example.TradeHub.entities.Image;
import com.example.TradeHub.repositories.ImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

    @Autowired
    private ImageRepo imageRepo;

    public Image save (Image image){
        return imageRepo.save(image);
    }

}
