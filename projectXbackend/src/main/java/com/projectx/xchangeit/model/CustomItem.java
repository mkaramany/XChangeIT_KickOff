package com.projectx.xchangeit.model;

import java.util.Date;

public class CustomItem {

	private Integer id;

	private String title;

	private String description;

	private Double price;

	private String status;

	private Image image;

	private Date publishDate;

	private Date lastModifiedDate;

	private byte[] thumbnail;

//	public CustomItem() {
//		super();
//	}

	public CustomItem(Integer id, String title, String description, String status, byte[] thumbnail, Double price) {
		super();
		this.id = id;
		this.status = status;
		this.title = title;
		this.description = description;
		this.thumbnail = thumbnail;
		this.price = price;
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

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
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

}
