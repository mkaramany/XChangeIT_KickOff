package com.projectx.xchangeit.model;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Type;


/**
 * The persistent class for the "User" database table.
 * 
 */
@Entity
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@NotBlank(message = "Required")
	private String email;

	@Column(name = "first_login")
	private Boolean firstLogin;

	@NotBlank(message = "Required")
	@Size(max = 80)
	@Column(name = "first_name")
	private String firstName;

	@NotBlank(message = "Required")
	@Size(max = 80)
	@Column(name = "last_name")
	private String lastName;

	private String password;
	
	@Column(name = "phone_number")
	private String phoneNumber;

	@Lob
	@Type(type = "org.hibernate.type.BinaryType")
	@Column(name = "profile_picture")
	private byte[] profilePicture;

	@Column(name = "verification_code")
	private Integer verificationCode;

	@Column(name = "role_code")
	private String roleCode;

	@Enumerated(EnumType.STRING)
	private AuthProvider provider;
	
	// bi-directional many-to-one association to Item
	// @OneToMany(fetch = FetchType.LAZY, mappedBy="user")
	@Transient
	private List<Item> items;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private Address address;
	

	private String profilePictureUrl;

	public User() {
	}

	public User(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getFirstLogin() {
		return this.firstLogin;
	}

	public void setFirstLogin(Boolean firstLogin) {
		this.firstLogin = firstLogin;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public byte[] getProfilePicture() {
		return this.profilePicture;
	}

	public void setProfilePicture(byte[] profilePicture) {
		this.profilePicture = profilePicture;
	}

	public Integer getVerificationCode() {
		return this.verificationCode;
	}

	public void setVerificationCode(Integer verificationCode) {
		this.verificationCode = verificationCode;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getProfilePictureUrl() {
		return profilePictureUrl;
	}

	public void setProfilePictureUrl(String profilePictureUrl) {
		this.profilePictureUrl = profilePictureUrl;
	}

	public AuthProvider getProvider() {
		return provider;
	}

	public void setProvider(AuthProvider provider) {
		this.provider = provider;
	}

	public List<Item> getItems() {
		return this.items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public Item addItem(Item item) {
		getItems().add(item);
		item.setProducer(this);

		return item;
	}

	public Item removeItem(Item item) {
		getItems().remove(item);
		item.setProducer(null);

		return item;
	}

	public Address getAddress() {
		return this.address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}


	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", firstLogin=" + firstLogin + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", password=" + password + ", profilePicture="
				+ Arrays.toString(profilePicture) + ", verificationCode=" + verificationCode + ", items=" + ""
				+ ", address=" + address + "]";
	}

}