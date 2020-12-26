package com.projectx.xchangeit.service.impl;

import java.io.IOException;
import java.util.Base64;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.projectx.xchangeit.model.Image;
import com.projectx.xchangeit.repository.ImageRepository;
import com.projectx.xchangeit.service.ImageStorageService;

@Service
public class ImageStorageServiceImpl implements ImageStorageService{

  @Autowired
  private ImageRepository imageRepository;

  @Override
  public Image store(MultipartFile file) throws IOException {
    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
   // Image Image = new Image(fileName, file.getContentType(), file.getBytes());

    return imageRepository.save(null);
  }

  @Override
  public Image getFile(Integer id) {
    Image file = imageRepository.findById(id).get();
    file.setBase64(encodeBase64(file.getImage()));
    return file;
  }
  
  @Override
  public Stream<Image> getAllFiles() {
    return imageRepository.findAll().stream();
  }
  
  @Override
  public String encodeBase64(byte[] bytes)
  {
	  return Base64.getEncoder().encodeToString(bytes);
  }
}
