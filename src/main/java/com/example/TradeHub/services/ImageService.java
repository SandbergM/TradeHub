package com.example.TradeHub.services;

import com.example.TradeHub.entities.Image;
import com.example.TradeHub.repositories.ImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ImageService {

    @Autowired
    private ImageRepo imageRepo;

    private static final String currentWorkingDirectory = System.getProperty("user.dir");
    private static final String frontendUploadDirectory = "/uploads/images/";
    private static final String backendUploadDirectory = currentWorkingDirectory + "/src/main/resources/static/" + frontendUploadDirectory;

    @PostConstruct
    public void createFolderIfMissing() {
        File dirPath = new File(backendUploadDirectory);
        if (!dirPath.exists()) {
            dirPath.mkdirs();
        }
    }

    public List<Image> save (List<MultipartFile> files){
        final List<String> supportedFileExtensions = List.of(".png,.jpg,.jpeg,.gif,.bmp,.jfif".split(","));
        List<Image> images = new ArrayList<>();

        for (MultipartFile file : files) {
            final UUID uuid = UUID.randomUUID();
            String fileExt = file.getOriginalFilename().toLowerCase();
            fileExt = fileExt.substring(fileExt.lastIndexOf("."));
            final String filename = uuid + fileExt;

            if (!supportedFileExtensions.contains(fileExt)) { continue; }

            File targetLocation = new File(backendUploadDirectory + filename);

            try {
                file.transferTo(targetLocation);
                Image image = new Image(frontendUploadDirectory + filename, images.isEmpty());
                images.add(imageRepo.save(image));
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return images;
    }

}