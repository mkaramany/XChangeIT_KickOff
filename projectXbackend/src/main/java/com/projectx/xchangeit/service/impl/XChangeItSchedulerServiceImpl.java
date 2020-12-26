package com.projectx.xchangeit.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.projectx.xchangeit.model.Item;
import com.projectx.xchangeit.service.ItemService;
import com.projectx.xchangeit.service.XChangeItMailService;
import com.projectx.xchangeit.service.XChangeItSchedulerService;

@Service
@Transactional
public class XChangeItSchedulerServiceImpl implements XChangeItSchedulerService{
	
	@Autowired
	ItemService itemService;
	
	@Autowired
	XChangeItMailService mailService;

	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
	
	@Override
	@Scheduled(cron = "${xchangeit.scheduler.rate.appointment.reached}")
	public void appointmentReachedTaskScheduler() throws MessagingException {
		System.out.println("appointmentReachedTaskScheduler at: "+dateFormat.format(new Date()));
		List<Item> reservedItems = itemService.listAppointmentReachedItems();
		mailService.sendAppointmentReachedMail(reservedItems);
	}

	@Override
	//@Scheduled(fixedRate = 180000)
	public void testScheduler() {
		System.out.println("The time now is: " + dateFormat.format(new Date()));
	}
	

	


}
