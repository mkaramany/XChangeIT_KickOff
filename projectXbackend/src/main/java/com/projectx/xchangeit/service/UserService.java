package com.projectx.xchangeit.service;

import java.util.Optional;

import com.projectx.xchangeit.model.User;

public interface UserService {

	User loadUserByUsername(String username);

	boolean existsByEmail(String email);

	void signUp(User registeredUser);

	boolean verifyUser(String phoneNumber, String verificationCode);

	User getUserById(Integer id);

	User addUser(User user);

	User editUser(User user);

	void deleteUser(User user);

	Optional<User> findById(Integer id);

	boolean existsByPhoneNumber(String number);

	User loadUserByPhoneNumber(String number);
	

}
