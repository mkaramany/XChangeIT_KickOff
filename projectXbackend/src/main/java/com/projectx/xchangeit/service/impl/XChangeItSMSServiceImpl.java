package com.projectx.xchangeit.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.projectx.xchangeit.service.XChangeItSMSService;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
 
@Service
public class XChangeItSMSServiceImpl implements XChangeItSMSService{
	
	@Value("${xchangeit.twilio.account.sid}")
	private String ACCOUNT_SID;
	
	@Value("${xchangeit.twilio.account.token}")
	private String AUTH_TOKEN;
	
	@Value("${xchangeit.twilio.number}")
	private String TWILIO_NUMBER;


	
	@Override
	public void sendSMS(String to, String body){
		  Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
	        Message message = Message.creator(
	                new PhoneNumber(to),
	                new PhoneNumber(TWILIO_NUMBER),
	                body)
	                .create();
	}



	@Override
	public void sendVerificationSMS(String to, String recipientName, String verificationCode) {
		String messageBody = "Dear "+recipientName+", \n"+"Your Verification Code is "+verificationCode;
		
		sendSMS(to, messageBody);
		
	}
	
	
	

	
	
}
