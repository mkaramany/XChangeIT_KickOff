package com.projectx.xchangeit.model;

import java.io.Serializable;

public class VerificationRequest implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String email;
	private String verificationCode;

	// need default constructor for JSON Parsing
	public VerificationRequest() {

	}

	public VerificationRequest(String email, String verificationCode) {
		this.email = email;
		this.verificationCode = verificationCode;
	}

	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getVerificationCode() {
		return verificationCode;
	}

	public void setVerificationCode(String verificationCode) {
		this.verificationCode = verificationCode;
	}

}
