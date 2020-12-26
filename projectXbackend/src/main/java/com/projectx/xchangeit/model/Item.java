package com.projectx.xchangeit.model;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * The persistent class for the "Item" database table.
 * 
 */
@Entity
@JsonSerialize
public class Item implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String description;

	private String status = "AVAILABLE";

	private String title;

	private Boolean deleted = false;

	private Timestamp publishDate;

	private Timestamp lastModifiedDate;

	@Lob
	@Type(type = "org.hibernate.type.BinaryType")
	private byte[] thumbnail;

	// bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name = "owner_id")
	private User producer;

	@ManyToOne
	@JoinColumn(name = "receiver_id")
	private User receiver;

	// uni-directional one-to-many association to Slot
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "item_id", referencedColumnName = "id")
	private List<Slot> slots;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "item_id", referencedColumnName = "id")
	private List<Image> images;

	@Transient
	Slot reservedSlot;

	public Item() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public Timestamp getPublishDate() {
		return publishDate;
	}

	public void setPublishDate(Timestamp publishDate) {
		this.publishDate = publishDate;
	}

	public Timestamp getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Timestamp lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	public User getProducer() {
		return producer;
	}

	public void setProducer(User producer) {
		this.producer = producer;
	}

	public User getReceiver() {
		return receiver;
	}

	public void setReceiver(User receiver) {
		this.receiver = receiver;
	}

	public List<Slot> getSlots() {
		return this.slots;
	}

	public void setSlots(List<Slot> slots) {
		this.slots = slots;
	}

	public List<Image> getImages() {
		return images;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}

	public byte[] getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(byte[] thumbnail) {
		this.thumbnail = thumbnail;
	}

	public Slot getReservedSlot() {
		return reservedSlot;
	}

	public void setReservedSlot(Slot reservedSlot) {
		this.reservedSlot = reservedSlot;
	}

	public Slot addSlot(Slot slot) {
		getSlots().add(slot);
		slot.setItem(this);

		return slot;
	}

	public Slot removeSlot(Slot slot) {
		getSlots().remove(slot);
		slot.setItem(null);

		return slot;
	}

	@Override
	public String toString() {
		return "Item [id=" + id + ", description=" + description + ", status=" + status + ", title=" + title + ", user="
				+ producer + ", slots=" + slots + "]";
	}

}