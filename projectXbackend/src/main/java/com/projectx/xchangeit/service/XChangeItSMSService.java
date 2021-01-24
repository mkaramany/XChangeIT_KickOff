package com.projectx.xchangeit.service;

public interface XChangeItSMSService {

	void sendSMS(String to, String body);

	void sendVerificationSMS(String to, String recipientName, String verificationCode);

}
