package com.projectx.xchangeit.service.impl;

import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectx.xchangeit.model.RoleEnum;
import com.projectx.xchangeit.model.User;
import com.projectx.xchangeit.repository.UserRepository;
import com.projectx.xchangeit.service.UserService;
import com.projectx.xchangeit.util.CodeGenerationUtil;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	XChangeItMailServiceImpl xchangeitMailService;

	@Override
	public void test() {
		List<User> users = (List<User>) userRepository.findAll();
		for (User user : users) {
			System.out.println("user " + user.toString());
		}
	}

	@Override
	public User loadUserByUsername(String username) {
		return userRepository.findByEmail(username);
	}

	@Override
	public User getUserById(Integer id) {
		Optional<User> optionalUser = userRepository.findById(id);
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			return user;
		} else {
			return null;
		}
	}

	@Override
	public Optional<User> findById(Integer id) {
		return userRepository.findById(id);
	}

	@Override
	public boolean existsByEmail(String email) {
		User user = loadUserByUsername(email);
		if (user != null) {
			return true;
		}
		return false;
	}

	@Override
	public void signUp(User newXchangeItUser) {

		String verificationCode = CodeGenerationUtil.generateSixDigitCode();

		newXchangeItUser.setRoleCode(RoleEnum.ROLE_USER.name());
		newXchangeItUser.setVerificationCode(Integer.valueOf(verificationCode));
		newXchangeItUser.setFirstLogin(true);

		userRepository.save(newXchangeItUser);

		try {
			sendVerificationMail(newXchangeItUser.getEmail(), newXchangeItUser.getFirstName(), verificationCode);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.err.println("Could not send email message");
		}

	}

	@Override
	/**
	 * checks the user input verification code against the one saved in the db in
	 * case both codes match, the boolean "first time login is set to false" and
	 * return false in case of mismatch, return false
	 */
	public boolean verifyUser(String username, String verificationCode) {
		User user = loadUserByUsername(username);
		if (user != null) {
			if (user.getVerificationCode().equals(Integer.valueOf(verificationCode))) {
				user.setFirstLogin(false);
				userRepository.save(user);
				return true;
			}
		}

		return false;
	}

	@Override
	public User addUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public User editUser(User user) {
		User existingUser = getUserById(user.getId());
		existingUser.setFirstName(user.getFirstName());
		existingUser.setLastName(user.getLastName());
		existingUser.setProfilePicture(user.getProfilePicture());
		existingUser.getAddress().setCity(user.getAddress().getCity());
		existingUser.getAddress().setZipCode(user.getAddress().getZipCode());
		existingUser.getAddress().setStreetName(user.getAddress().getStreetName());
		existingUser.getAddress().setHouseNumber(user.getAddress().getHouseNumber());

		return userRepository.save(existingUser);
	}

	@Override
	public void deleteUser(User user) {
		userRepository.delete(user);
	}

	private void sendVerificationMail(String to, String recipientName, String verificationCode)
			throws MessagingException {

		xchangeitMailService.sendVerificationMail(to, recipientName, verificationCode);
	}

}
