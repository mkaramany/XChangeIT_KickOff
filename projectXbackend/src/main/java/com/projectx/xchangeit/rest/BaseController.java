package com.projectx.xchangeit.rest;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projectx.xchangeit.model.AuthenticationRequest;
import com.projectx.xchangeit.model.AuthenticationResponse;
import com.projectx.xchangeit.model.User;
import com.projectx.xchangeit.model.VerificationRequest;
import com.projectx.xchangeit.payload.MessageResponse;
import com.projectx.xchangeit.security.TokenProvider;
import com.projectx.xchangeit.security.UserPrincipal;
import com.projectx.xchangeit.service.AddressService;
import com.projectx.xchangeit.service.XchangeItUserDetailsService;
import com.projectx.xchangeit.service.UserService;

@CrossOrigin
@RestController
public class BaseController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private TokenProvider jwtTokenProvider;

	@Autowired
	private XchangeItUserDetailsService userDetailsService;

	@Autowired
	private UserService userService;

	@Autowired
	private AddressService addressService;

	@Autowired
	PasswordEncoder encoder;


	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {

		try {// TODO handle 1st time login
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		} catch (BadCredentialsException e) {
			return new ResponseEntity<MessageResponse>(new MessageResponse("Bad Credentials!"), HttpStatus.UNAUTHORIZED);
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

		UserPrincipal userPrincipal = (UserPrincipal) userDetails;
		final String jwt = jwtTokenProvider.createToken(userPrincipal);

		User user = userService.loadUserByUsername(userDetails.getUsername());
		// TODO replace with roles list inside user
		List<String> userRoles = new ArrayList<String>();
		userRoles.add(user.getRoleCode());

		return ResponseEntity.ok(new AuthenticationResponse(jwt, user.getId(), user.getEmail(), user.getFirstName(),
				user.getLastName(), userRoles, user.getAddress(), user.getProfilePicture()));
	}

	@RequestMapping(value = "/signUp", method = RequestMethod.POST)
	public ResponseEntity<?> registerUser(@RequestBody User user) {

		if (userService.existsByEmail(user.getEmail())) {
			return ResponseEntity.ok().body(new MessageResponse("Email is already in use!"));
		}
		
		if (userService.existsByPhoneNumber(user.getPhoneNumber())) {
			return ResponseEntity.ok().body(new MessageResponse("Phone number is already in use!"));
		}

		// Create new user's account (encode password)
		User newXChangeItUser = user;
		newXChangeItUser.setPassword(encoder.encode(user.getPassword()));


		userService.signUp(newXChangeItUser);

		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/me").buildAndExpand(1).toUri();

		return ResponseEntity.created(location).body(newXChangeItUser);
	}

	private boolean validateUserInfo() {
		// TODO Auto-generated method stub
		// create validator pckg
		return true;

	}

	@RequestMapping(value = "/verify", method = RequestMethod.POST)
	public ResponseEntity<?> verifyUser(@RequestBody VerificationRequest request) {

		if (!userService.verifyUser(request.getPhoneNumber(), request.getVerificationCode())) {
			return ResponseEntity.ok().body(new MessageResponse("Invalid Verification Code!"));
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getPhoneNumber());

		UserPrincipal userPrincipal = (UserPrincipal) userDetails;
		final String jwt = jwtTokenProvider.createToken(userPrincipal);

		User user = userService.loadUserByUsername(userDetails.getUsername());
		// TODO replace with roles list inside user
		List<String> userRoles = new ArrayList<String>();
		userRoles.add(user.getRoleCode());

		return ResponseEntity.ok(new AuthenticationResponse(jwt, user.getId(), user.getEmail(), user.getFirstName(),
				user.getLastName(), userRoles, user.getAddress(), user.getProfilePicture()));

	}

//	private User getAuthenticatedUserByEmail(String email) {
//		//TODO replace redundat logic here
//		return null;
//	}
}
