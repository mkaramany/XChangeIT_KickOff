package com.projectx.xchangeit.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import com.projectx.xchangeit.model.Item;
import com.projectx.xchangeit.service.XChangeItMailService;
import com.projectx.xchangeit.util.DateTimeUtils;

@Service
public class XChangeItMailServiceImpl implements XChangeItMailService {

	@Autowired
	private JavaMailSender sender;

	@Autowired
	private SpringTemplateEngine thymeleafTemplateEngine;

	@Value("${xchangeit.frontend.baseURL}")
	private String BASE_URL;

	private static final String NO_REPLY_ADDRESS = "no-reply@projectx.com";

	private static final String VIEW_ITEM_URL_SUFFIX = "app/items/viewItem";
	
	private static final String TAKEN_ITEM_URL_SUFFIX = "app/items/takenItem";

	private static final String NOT_TAKEN_ITEM_URL_SUFFIX = "app/items/notTakenItem";

	@Override
	public void sendAppointmentReachedMail(List<Item> items) throws MessagingException {
		String subject = " Appointment Time Reached";

		for (Item item : items) {
			String to = item.getProducer().getEmail();
			Map<String, Object> emailTemplate = new HashMap<String, Object>();
			emailTemplate.put("producer", item.getProducer().getFirstName());
			emailTemplate.put("itemTitle", item.getTitle());
			emailTemplate.put("itemId", item.getId());
			emailTemplate.put("linkToItem", BASE_URL + VIEW_ITEM_URL_SUFFIX);
			emailTemplate.put("linkToTakenItem", BASE_URL + TAKEN_ITEM_URL_SUFFIX);
			emailTemplate.put("linkEditToItem", BASE_URL + NOT_TAKEN_ITEM_URL_SUFFIX);
			sendMessageUsingThymeleafTemplate(to, subject, "item-appointment-reached-template.html", emailTemplate);

		}

	}

	@Override
	public void sendVerificationMail(String to, String recipientName, String verificationCode)
			throws MessagingException {
		String subject = "Welcome to XChangeIt";

		Map<String, Object> emailTemplate = new HashMap<String, Object>();
		emailTemplate.put("senderName", "XChangeIt Team");
		emailTemplate.put("text", "your verification code is: " + verificationCode);
		emailTemplate.put("recipientName", recipientName);

		sendMessageUsingThymeleafTemplate(to, subject, "welcome-email-template.html", emailTemplate);

	}

	@Override
	public void sendItemReservationMail(Item item, String userType) throws Exception {// TODO convert type to
																						// enum
		String subject = "Item Reservation Notification";
		String templateName = "";
		String to = "";
		Map<String, Object> emailTemplate = new HashMap<String, Object>();

		switch (userType) {
		case "PRODUCER":
			templateName = "item-reserved-producer-template.html";
			to = item.getProducer().getEmail();
			emailTemplate.put("producer", item.getProducer().getFirstName());
			emailTemplate.put("receiver", item.getReceiver().getFirstName() + " " + item.getReceiver().getLastName());
			break;

		case "RECEIVER":
			templateName = "item-reserved-receiver-template.html";
			to = item.getReceiver().getEmail();
			emailTemplate.put("receiver", item.getReceiver().getFirstName());
			emailTemplate.put("producer", item.getProducer().getFirstName() + " " + item.getProducer().getLastName());
			break;

		default:
			throw new Exception("Unkown User Type");
		}

		emailTemplate.put("itemTitle", item.getTitle());
		emailTemplate.put("itemId", item.getId());
		emailTemplate.put("address", item.getProducer().getAddress());
		emailTemplate.put("time", DateTimeUtils.getXChangeItSlotAsString(item.getReservedSlot()));
		emailTemplate.put("linkToItem", BASE_URL + VIEW_ITEM_URL_SUFFIX);
		emailTemplate.put("senderName", "XChangeIt Team");

		sendMessageUsingThymeleafTemplate(to, subject, templateName, emailTemplate);

	}

	@Override
	public void sendMessageUsingThymeleafTemplate(String to, String subject, String templateName,
			Map<String, Object> templateModel) throws MessagingException {

		Context thymeleafContext = new Context();
		thymeleafContext.setVariables(templateModel);

		String htmlBody = thymeleafTemplateEngine.process(templateName, thymeleafContext);

		sendXChangeItHtmlMessage(to, subject, htmlBody);
	}

	private void sendXChangeItHtmlMessage(String to, String subject, String htmlBody) throws MessagingException {

		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
		helper.setFrom(NO_REPLY_ADDRESS);
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(htmlBody, true);
		// helper.addInline("attachment.png", resourceFile);
		sender.send(message);
	}

}
