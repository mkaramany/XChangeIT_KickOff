package com.projectx.xchangeit.service;

import javax.mail.MessagingException;

public interface XChangeItSchedulerService {

	void testScheduler();

	void appointmentReachedTaskScheduler() throws MessagingException;

}
