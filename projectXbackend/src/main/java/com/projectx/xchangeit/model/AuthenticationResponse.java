package com.projectx.xchangeit.model;

import java.io.Serializable;
import java.util.List;

public class AuthenticationResponse implements Serializable {

	private final String jwt;
	private String type = "Bearer";
	private Integer id;
	private String firstName;
	private String lastName;
	private String email;
	private List<String> roles;
	private Address address;
	private byte[] profilePicture;

	public AuthenticationResponse(String jwt, Integer id, String email, String firstName, String lastName, List<String> roles,
			Address address, byte[] profilePicture) {
		this.jwt = jwt;
		this.id = id;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.roles = roles;
		this.address = address;
		this.profilePicture = profilePicture;
	}

	public String getJwt() {
		return jwt;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public byte[] getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(byte[] profilePicture) {
		this.profilePicture = profilePicture;
	}
	
	

}
