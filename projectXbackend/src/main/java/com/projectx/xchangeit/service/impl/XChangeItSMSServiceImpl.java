package com.projectx.xchangeit.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.services.sns.AmazonSNSClient;
import com.amazonaws.services.sns.model.MessageAttributeValue;
import com.amazonaws.services.sns.model.PublishRequest;
import com.amazonaws.services.sns.model.PublishResult;
import com.projectx.xchangeit.service.XChangeItSMSService;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class XChangeItSMSServiceImpl implements XChangeItSMSService {

	@Value("${xchangeit.sms.senderID}")
	private String SENDER_ID;

	@Override
	public void sendSMS(String to, String message, String senderID) {
		AmazonSNSClient snsClient = new AmazonSNSClient();
		Map<String, MessageAttributeValue> smsAttributes = new HashMap<String, MessageAttributeValue>();
		smsAttributes.put("AWS.SNS.SMS.SenderID",
				new MessageAttributeValue().withStringValue(senderID).withDataType("String"));
		smsAttributes.put("AWS.SNS.SMS.SMSType",
				new MessageAttributeValue().withStringValue("Promotional").withDataType("String"));

		PublishResult result = snsClient.publish(
				new PublishRequest().withMessage(message).withPhoneNumber(to).withMessageAttributes(smsAttributes));
		System.out.println(result);
	}

	@Override
	public void sendVerificationSMS(String to, String recipientName, String verificationCode) {
		String messageBody = "Dear " + recipientName + ", \n" + "Your Verification Code is " + verificationCode;

		sendSMS(to, messageBody, SENDER_ID);

	}

}
