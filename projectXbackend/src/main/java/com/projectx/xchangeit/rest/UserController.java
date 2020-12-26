package com.projectx.xchangeit.rest;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projectx.xchangeit.exception.ResourceNotFoundException;
import com.projectx.xchangeit.model.RoleEnum;
import com.projectx.xchangeit.model.User;
import com.projectx.xchangeit.payload.MessageResponse;
import com.projectx.xchangeit.security.CurrentUser;
import com.projectx.xchangeit.security.TokenProvider;
import com.projectx.xchangeit.security.UserPrincipal;
import com.projectx.xchangeit.service.AddressService;
import com.projectx.xchangeit.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private TokenProvider tokenProvider;

	@Autowired
	private UserService userService;

	@Autowired
	private AddressService addressService;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public User getUser(@PathVariable Integer id) {
		return userService.getUserById(id);
	}

	@RequestMapping(value = "/edit", method = RequestMethod.PUT)
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> editUser(@Valid @RequestBody User userToEdit,
			@RequestHeader(name = "Authorization") String authorizationHeader) {

		String jwtToken = authorizationHeader.substring(7);
		Integer userId = tokenProvider.getUserIdFromToken(jwtToken);
		User requestor = userService.getUserById(userId);

		if (requestor.getId() == userToEdit.getId() || RoleEnum.ROLE_ADMIN.name().equals(requestor.getRoleCode())) {
			String cityByOSM = addressService.getCityByZipCode(userToEdit.getAddress().getZipCode());
			if (StringUtils.isEmpty(cityByOSM)) {
				return ResponseEntity.ok().body(new MessageResponse("Zip Code does not exist!"));
			}
			userToEdit.getAddress().setCity(cityByOSM);
			return ResponseEntity.ok(userService.editUser(userToEdit));
		}
		return new ResponseEntity<String>("Forbidden", HttpStatus.FORBIDDEN);
	}

	@GetMapping("/me")
	@PreAuthorize("hasRole('USER')")
	public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
		return userService.findById(userPrincipal.getId())
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
	}

}
