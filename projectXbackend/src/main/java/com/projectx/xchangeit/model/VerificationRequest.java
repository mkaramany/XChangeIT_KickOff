package com.projectx.xchangeit.model;

import java.io.Serializable;

public class VerificationRequest implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String phoneNumber;
	private String verificationCode;

	// need default constructor for JSON Parsing
	public VerificationRequest() {

	}

	public VerificationRequest(String phoneNumber, String verificationCode) {
		this.phoneNumber = phoneNumber;
		this.verificationCode = verificationCode;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getVerificationCode() {
		return verificationCode;
	}

	public void setVerificationCode(String verificationCode) {
		this.verificationCode = verificationCode;
	}

}
