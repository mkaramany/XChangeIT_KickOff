package com.projectx.xchangeit.service;

import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;

import com.projectx.xchangeit.model.Item;

public interface XChangeItMailService {

	void sendMessageUsingThymeleafTemplate(String to, String subject, String templateName,
			Map<String, Object> templateModel) throws MessagingException;

	void sendVerificationMail(String to, String recipientName, String verificationCode) throws MessagingException;

	void sendItemReservationMail(Item item, String string) throws MessagingException, Exception;

	void sendAppointmentReachedMail(List<Item> items) throws MessagingException;

}
