package com.projectx.xchangeit.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "item_images")
public class Image {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Lob
	@Type(type = "org.hibernate.type.BinaryType")
	private byte[] image;

	@Transient
	private String base64;

	@Column(name = "primary_image")
	private Boolean primaryImage; 
	
	@Column(name = "item_id")
	private Integer itemId; 

	public Image() {
	}

	public Image(byte[] image) {

		this.image = image;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public String getBase64() {
		return base64;
	}

	public void setBase64(String base64) {
		this.base64 = base64;
	}

	public Boolean getPrimaryImage() {
		return primaryImage;
	}

	public void setPrimaryImage(Boolean primaryImage) {
		this.primaryImage = primaryImage;
	}

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}
	
	

}
