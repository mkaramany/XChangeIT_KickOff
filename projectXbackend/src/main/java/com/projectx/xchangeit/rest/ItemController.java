package com.projectx.xchangeit.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projectx.xchangeit.model.CustomItem;
import com.projectx.xchangeit.model.Item;
import com.projectx.xchangeit.model.ItemSearchCriteria;
import com.projectx.xchangeit.model.ItemStatusEnum;
import com.projectx.xchangeit.model.RoleEnum;
import com.projectx.xchangeit.model.User;
import com.projectx.xchangeit.security.TokenProvider;
import com.projectx.xchangeit.service.ItemService;
import com.projectx.xchangeit.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/items")
public class ItemController {

	@Autowired
	private ItemService itemService;

	@Autowired
	private UserService userService;

	@Autowired
	private TokenProvider tokenProvider;

	@RequestMapping({ "/permitAll/list" })
	public List<CustomItem> listAllItems() {
		return itemService.listNonDeleted();
	}

	@RequestMapping({ "/userItems/{userId}" })
	public List<CustomItem> listuserItems(@PathVariable Integer userId) {
		return itemService.listUserItems(userId);
	}

	@RequestMapping(method = RequestMethod.GET, value = "/permitAll/{id}")
	public Item getItemById(@PathVariable Integer id) {
		return itemService.getItemById(id);
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public Item addItem(@RequestBody Item item) {
		return itemService.addItem(item);
	}

	@RequestMapping(value = "/reserve", method = RequestMethod.POST)
	public ResponseEntity<?> reserveItem(@RequestBody Item item) {
		Item reservedItem = itemService.reserveItem(item);
		if (reservedItem == null)
			return new ResponseEntity<String>("Reservation Not Allowed", HttpStatus.FORBIDDEN);
		return ResponseEntity.ok(reservedItem);
	}

	@RequestMapping(value = "/edit", method = RequestMethod.PUT)
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> editItem(@RequestBody Item item,
			@RequestHeader(name = "Authorization") String authorizationHeader) {

		Integer userId = tokenProvider.getUserIdFromHeader(authorizationHeader);
		User user = userService.getUserById(userId);

		if ((user.getId() == item.getProducer().getId()
				|| RoleEnum.ROLE_ADMIN.name().equals(user.getRoleCode()))
				&& ItemStatusEnum.AVAILABLE.name().equals(item.getStatus())) {
			return ResponseEntity.ok(itemService.editItem(item));
		}
		return new ResponseEntity<String>("Forbidden", HttpStatus.FORBIDDEN);
	}

	@RequestMapping(value = "/setTaken/{id}", method = RequestMethod.PUT)
	public Item setItemAsTaken(@PathVariable Integer id) {
		return itemService.setItemAsTaken(id);
	}

	@RequestMapping(value = "/setNotTaken/{id}", method = RequestMethod.PUT)
	public Item setItemAsNotTaken(@PathVariable Integer id) {
		return itemService.setItemAsNotTaken(id);
	}

	@RequestMapping(value = "/saveNewSlots", method = RequestMethod.PUT)
	public Item saveNewSlots(@RequestBody Item item) {
		return itemService.saveNewSlots(item);
	}

	@RequestMapping(value = "/permitAll/search", method = RequestMethod.POST)
	public List<Item> searchItems(@RequestBody ItemSearchCriteria searchCriteria) {
		return itemService.searchItems(searchCriteria);
	}

	@RequestMapping(value = "/delete/{itemId}", method = RequestMethod.PUT)
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> delete(@PathVariable Integer itemId,
			@RequestHeader(name = "Authorization") String authorizationHeader) {

		Integer userId = tokenProvider.getUserIdFromHeader(authorizationHeader);
		User user = userService.getUserById(userId);
		Item itemToBeDeleted = itemService.getItemById(itemId);

		if ((user.getId() == itemToBeDeleted.getProducer().getId()
				|| RoleEnum.ROLE_ADMIN.name().equals(user.getRoleCode()))
				&& ItemStatusEnum.AVAILABLE.name().equals(itemToBeDeleted.getStatus())) {
			itemService.deleteItem(itemId);
			return new ResponseEntity<String>("deleted", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Forbidden", HttpStatus.FORBIDDEN);
	}

}
