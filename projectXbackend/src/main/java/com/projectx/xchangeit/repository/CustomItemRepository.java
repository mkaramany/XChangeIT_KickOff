package com.projectx.xchangeit.repository;

import java.util.List;

import com.projectx.xchangeit.model.CustomItem;
import com.projectx.xchangeit.model.Image;
import com.projectx.xchangeit.model.Item;
import com.projectx.xchangeit.model.ItemSearchCriteria;

public interface CustomItemRepository {

	List<Item> itemSearch(ItemSearchCriteria searchCriteria);

	List<Image> listPrimaryImages();

	List<CustomItem> listAllNonDeletedItems();

	List<CustomItem> listUserItems(Integer userId);


}
