package com.projectx.xchangeit.service;

import java.util.List;

import com.projectx.xchangeit.model.CustomItem;
import com.projectx.xchangeit.model.Item;
import com.projectx.xchangeit.model.ItemSearchCriteria;

public interface ItemService {

	void test();

	List<Item> listAll();

	Item getItemById(Integer id);

	Item addItem(Item item);

	Item reserveItem(Item item);

	List<Item> listAppointmentReachedItems();

	Item editItem(Item item);

	void deleteItem(Integer itemId);

	Item setItemAsTaken(Integer id);

	Item setItemAsNotTaken(Integer id);

	Item saveNewSlots(Item item);

	List<Item> searchItems(ItemSearchCriteria searchCriteria);

	List<CustomItem> listNonDeleted();

	List<CustomItem> listUserItems(Integer userId);

}
