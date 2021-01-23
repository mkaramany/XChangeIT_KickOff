package com.projectx.xchangeit.model;

import java.util.Date;

public class CustomItem {

	private Integer id;

	private String title;

	private String description;

	private Double price;

	private String category;

	private User producer;

	private Double totalRating;

	private String status;

	private Date publishDate;

	private Date lastModifiedDate;

	private byte[] thumbnail;

	private Location location;

	public CustomItem(Integer id, String title, String description, String status, byte[] thumbnail, Double price,
			String category, User producer, Double totalRating, Location location) {
		super();
		this.id = id;
		this.status = status;
		this.title = title;
		this.description = description;
		this.thumbnail = thumbnail;
		this.price = price;
		this.category = category;
		this.producer = producer;
		this.totalRating = totalRating;
		this.location = location;

	}

	public CustomItem(Integer id, String title, String description, String status, Date publishDate,
			Date lastModifiedDate, byte[] thumbnail) {
		super();
		this.id = id;
		this.status = status;
		this.title = title;
		this.description = description;
		this.publishDate = publishDate;
		this.lastModifiedDate = lastModifiedDate;
		this.thumbnail = thumbnail;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public User getProducer() {
		return producer;
	}

	public void setProducer(User producer) {
		this.producer = producer;
	}

	public Date getPublishDate() {
		return publishDate;
	}

	public void setPublishDate(Date publishDate) {
		this.publishDate = publishDate;
	}

	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	public byte[] getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(byte[] thumbnail) {
		this.thumbnail = thumbnail;
	}

	public Double getTotalRating() {
		return totalRating;
	}

	public void setTotalRating(Double totalRating) {
		this.totalRating = totalRating;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	
}
