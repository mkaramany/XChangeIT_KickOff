package com.projectx.xchangeit.service;

import java.io.IOException;
import java.util.stream.Stream;

import org.springframework.web.multipart.MultipartFile;

import com.projectx.xchangeit.model.Image;

public interface ImageStorageService {

	Stream<Image> getAllFiles();

	String encodeBase64(byte[] bytes);

	Image getFile(Integer id);

	Image store(MultipartFile file) throws IOException;

}
