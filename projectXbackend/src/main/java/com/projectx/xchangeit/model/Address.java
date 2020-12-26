package com.projectx.xchangeit.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


/**
 * The persistent class for the "Address" database table.
 * 
 */
@Entity
public class Address implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@NotBlank(message = "Required")
	private String city;

	@NotNull
	@Column(name="house_number")
	private Integer houseNumber;

	@NotBlank(message = "Required")
	@Column(name="street_name")
	private String streetName;

	@NotBlank(message = "Required")
	@Column(name="zip_code")
	private String zipCode;

	//bi-directional many-to-one association to User
	//@OneToMany(mappedBy="address")
	@Transient
	private List<User> users;

	public Address() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Integer getHouseNumber() {
		return this.houseNumber;
	}

	public void setHouseNumber(Integer houseNumber) {
		this.houseNumber = houseNumber;
	}

	public String getStreetName() {
		return this.streetName;
	}

	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public List<User> getUsers() {
		return this.users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public User addUser(User user) {
		getUsers().add(user);
		user.setAddress(this);

		return user;
	}

	public User removeUser(User user) {
		getUsers().remove(user);
		user.setAddress(null);

		return user;
	}

	@Override
	public String toString() {
		return "Address [id=" + id + ", city=" + city + ", houseNumber=" + houseNumber + ", streetName=" + streetName
				+ ", zipCode=" + zipCode + ", users=" + "" + "]";
	}
	
	

}