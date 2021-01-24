package com.projectx.xchangeit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projectx.xchangeit.exception.ResourceNotFoundException;
import com.projectx.xchangeit.model.User;
import com.projectx.xchangeit.repository.UserRepository;
import com.projectx.xchangeit.security.UserPrincipal;

@Service
public class XchangeItUserDetailsService implements UserDetailsService {

	@Autowired
	UserService userService;

	@Autowired
	UserRepository userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
		User user = userService.loadUserByPhoneNumber(phoneNumber);

		return UserPrincipal.create(user);
	}

	@Transactional
	public UserDetails loadUserById(Integer id) {
		User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

		return UserPrincipal.create(user);
	}
}