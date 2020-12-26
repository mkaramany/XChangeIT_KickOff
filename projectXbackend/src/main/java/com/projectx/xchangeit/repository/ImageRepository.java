package com.projectx.xchangeit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectx.xchangeit.model.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {

}
