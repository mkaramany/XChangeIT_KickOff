package com.projectx.xchangeit.util;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import com.projectx.xchangeit.model.Slot;

public class DateTimeUtils {

	public static Date getXChangeItFormattedDateFromString(String dateString) {
		SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy", Locale.ENGLISH);
		Date date = null;
		try {
			date = formatter.parse(dateString);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	public static Time getXChangeItFormattedTimeFromString(String timeString) {

		Time time = Time.valueOf(timeString);
		return time;
	}

	public static String getXChangeItSlotAsString(Slot slot) {
		String slotAsString = "";
		String date = "";
		String fromTime = "";
		String toTime = "";

		SimpleDateFormat dateFormatter = new SimpleDateFormat("dd.MM.yyyy", Locale.ENGLISH);
		SimpleDateFormat timeFormatter = new SimpleDateFormat("HH:mm");

		date = dateFormatter.format(slot.getDateValue());
		fromTime = timeFormatter.format(slot.getFromValue());
		toTime = timeFormatter.format(slot.getToValue()); 
		
		slotAsString = date + ", " + fromTime + " - " + toTime;

		return slotAsString;
	}

}
