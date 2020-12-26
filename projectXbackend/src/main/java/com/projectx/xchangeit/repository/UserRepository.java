package com.projectx.xchangeit.repository;

import org.springframework.data.repository.CrudRepository;

import com.projectx.xchangeit.model.User;

public interface UserRepository extends CrudRepository<User, Integer>{

	User findByEmail(String email);
}
