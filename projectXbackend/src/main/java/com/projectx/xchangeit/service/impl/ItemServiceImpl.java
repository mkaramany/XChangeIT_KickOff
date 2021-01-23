package com.projectx.xchangeit.service.impl;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectx.xchangeit.model.CustomItem;
import com.projectx.xchangeit.model.Image;
import com.projectx.xchangeit.model.Item;
import com.projectx.xchangeit.model.ItemSearchCriteria;
import com.projectx.xchangeit.model.ItemStatusEnum;
import com.projectx.xchangeit.model.Slot;
import com.projectx.xchangeit.repository.ItemRepository;
import com.projectx.xchangeit.service.ItemService;
import com.projectx.xchangeit.service.SlotService;
import com.projectx.xchangeit.service.UserService;
import com.projectx.xchangeit.util.DateTimeUtils;
import com.projectx.xchangeit.util.ImageUtil;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

	@Autowired
	ItemRepository itemRepository;

	@Autowired
	UserService userService;

	@Autowired
	SlotService slotService;

	@Autowired
	XChangeItMailServiceImpl mailService;

	@Override
	public void test() {
		List<Item> items = (List<Item>) itemRepository.findAll();
		for (Item item : items) {
			System.out.println(item.toString());
		}
	}

	@Override
	public List<Item> listAll() {
		List<Item> items = (List<Item>) itemRepository.findAll();
		return items;
	}
	
	@Override
	public List<CustomItem> listUserItems(Integer userId) {
		List<CustomItem> items =  itemRepository.listUserItems(userId);
		return items;
	}

	@Override
	public List<CustomItem> listNonDeleted() {
		List<CustomItem> nonDeletedItems = itemRepository.listAllNonDeletedItems();
		return nonDeletedItems;

	}


	@Override
	public List<Item> listAppointmentReachedItems() {
		List<Item> items = itemRepository.listReservedAndAppointmentReached(ItemStatusEnum.RESERVED.toString(), true,
				java.sql.Date.valueOf(LocalDate.now()), java.sql.Time.valueOf(LocalTime.now()));
		return items;
	}

	@Override
	public Item getItemById(Integer id) {
		Optional<Item> optionalItem = itemRepository.findById(id);
		if (optionalItem.isPresent()) {
			Item item = optionalItem.get();
			return item;
		} else {
			return null;
		}
	}

	@Override
	public Item addItem(Item item) {

		// Handle item images
		List<Image> itemImages = item.getImages();
		Image primaryImage = itemImages.get(0);
		primaryImage.setPrimaryImage(true);
		Decoder decoder = Base64.getDecoder();
		for (Image image : itemImages) {
			byte[] decoded = decoder.decode(image.getBase64());
			image.setImage(decoded);
		}
		
		//create thumbnail
		byte[] thumbnailData = decoder.decode(primaryImage.getBase64());
		String fileType = ImageUtil.getFileType(thumbnailData);
		item.setThumbnail(ImageUtil.createThumbnail(thumbnailData, fileType));
		

		// handle item slots
		createXChangeItSlotFromString(item.getSlots());
		
		//set publish date
		item.setPublishDate(new Timestamp(System.currentTimeMillis()));

		item = itemRepository.save(item);
		return item;
	}

	@Override
	public Item reserveItem(Item item) {

		Item itemToBeReserved = getItemById(item.getId());

		if (itemToBeReserved.getProducer().getId() == item.getReceiver().getId()) {
			System.out.println("err user can't reserve their items");
			return null;
		} else {
			itemToBeReserved.setStatus(ItemStatusEnum.RESERVED.toString());
			itemToBeReserved.setReceiver(userService.loadUserByUsername(item.getReceiver().getEmail()));
			itemToBeReserved.setSlots(item.getSlots());
			itemToBeReserved.setReservedSlot(findReservedSlot(item));
			itemToBeReserved = itemRepository.save(itemToBeReserved);

			try {
				mailService.sendItemReservationMail(itemToBeReserved, "PRODUCER");
				mailService.sendItemReservationMail(itemToBeReserved, "RECEIVER");
			} catch (Exception e) {
				e.printStackTrace();
			}

		}

		return itemToBeReserved;
	}

	@Override
	public Item editItem(Item item) {
		return itemRepository.save(item);
	}

	@Override
	public void deleteItem(Integer itemId) {
		Item item = getItemById(itemId);
		item.setDeleted(true);
		itemRepository.save(item);
	}

	@Override
	public Item setItemAsTaken(Integer id) {
		Item item = getItemById(id);
		item.setStatus(ItemStatusEnum.TAKEN.toString());
		return itemRepository.save(item);
	}

	@Override
	public Item setItemAsNotTaken(Integer id) {
		Item item = getItemById(id);
		item.setStatus(ItemStatusEnum.AVAILABLE.toString());
		item.setReceiver(null);
		return itemRepository.save(item);
	}

	@Override
	public Item saveNewSlots(Item itemWithNewSlots) {

		Item persistedItem = getItemById(itemWithNewSlots.getId());
		createXChangeItSlotFromString(itemWithNewSlots.getSlots());
		persistedItem.setSlots(itemWithNewSlots.getSlots());
		persistedItem = itemRepository.save(persistedItem);
		return persistedItem;

	}

	@Override
	public List<Item> searchItems(ItemSearchCriteria searchCriteria) {
		return itemRepository.itemSearch(searchCriteria);
	}

	private Slot findReservedSlot(Item item) {
		Slot reservedSlot = null;
		for (Slot slot : item.getSlots()) {
			if (slot.isReserved() != null && slot.isReserved()) {
				reservedSlot = slot;
				break;
			}
		}
		return reservedSlot;

	}

	private void createXChangeItSlotFromString(List<Slot> itemSlots) {

		for (Slot slot : itemSlots) {

			Date slotDate = DateTimeUtils.getXChangeItFormattedDateFromString(slot.getDate());
			Time slotFrom = DateTimeUtils.getXChangeItFormattedTimeFromString(slot.getFrom());
			Time slotTo = DateTimeUtils.getXChangeItFormattedTimeFromString(slot.getTo());

			slot.setDateValue(slotDate);
			slot.setFromValue(slotFrom);
			slot.setToValue(slotTo);
		}

	}
	
//	private void setItemPrimaryImage(List<CustomItem> items, List<Image> images) {
//	for (CustomItem item : items) {
//		item.setImage(images.stream().filter(image -> image.getItemId().equals(item.getId()))
//				.collect(Collectors.toList()).get(0));
//		;
//	}
//}
	
}
