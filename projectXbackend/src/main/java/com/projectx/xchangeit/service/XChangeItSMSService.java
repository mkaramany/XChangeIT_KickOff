package com.projectx.xchangeit.service;

public interface XChangeItSMSService {

	void sendVerificationSMS(String to, String recipientName, String verificationCode);

	void sendSMS(String to, String message, String senderID);

}
