package com.projectx.xchangeit.model;

import java.io.Serializable;
import java.sql.Time;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

/**
 * The persistent class for the "Slot" database table.
 * 
 */
@Entity
public class Slot implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Temporal(TemporalType.DATE)
	@Column(name="slot_date")
	private Date dateValue;

	@Column(name="slot_from")
	private Time fromValue;

	@Column(name="slot_to")
	private Time toValue;
	
	@Column(name="is_reserved")
	private Boolean reserved;

	@Transient
	private String date;
	@Transient
	private String from;
	@Transient
	private String to;


	@Transient
	private Item item;

	public Slot() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getDateValue() {
		return dateValue;
	}

	public void setDateValue(Date dateValue) {
		this.dateValue = dateValue;
	}

	public Time getFromValue() {
		return fromValue;
	}

	public void setFromValue(Time fromValue) {
		this.fromValue = fromValue;
	}

	public Time getToValue() {
		return toValue;
	}

	public void setToValue(Time toValue) {
		this.toValue = toValue;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public Item getItem() {
		return this.item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public Boolean isReserved() {
		return reserved;
	}

	public void setReserved(Boolean reserved) {
		this.reserved = reserved;
	}

	@Override
	public String toString() {
		return "Slot [id=" + id + ", date=" + date + ", from=" + from + ", to=" + to + ", item=" + "" + "]";
	}

}