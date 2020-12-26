package com.projectx.xchangeit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.projectx.xchangeit.repository.ItemRepository;
import com.projectx.xchangeit.service.AddressService;
import com.projectx.xchangeit.service.ItemService;
import com.projectx.xchangeit.service.SlotService;
import com.projectx.xchangeit.service.XChangeItMailService;
import com.projectx.xchangeit.service.UserService;

@Component
public class StartUp implements CommandLineRunner {

	@Autowired
	private ItemService itemService;

	@Autowired
	private ItemRepository itemRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private AddressService addressService;

	@Autowired
	private XChangeItMailService mailService;

	@Autowired
	private SlotService slotService;

	@Override
	public void run(String... args) throws Exception {
		// addressService.test();

		// itemService.test();

		// userService.test();

//		Map<String, Object> model = new HashMap<String, Object>();
//		model.put("senderName", "XChangeIT Team");
//		model.put("text", "email message body goes here");
//		model.put("recipientName", "XChangeIT User");

		// mailService.sendVerificationMail("marwa.m.ashraf@gmail.com", "Marwa",
		// "1234567");

		// DateTimeUtils.getXChangeITeFormattedDateFromString("20.08.2020");
		// DateTimeUtils.getXChangeITeFormattedTimeFromString("15:30");

		// boolean user = userService.verifyUser("sherif.hanno@gmail.com", "51875");
		// System.out.println("verified: "+user);

//		List<Slot> slots = slotService.findByReserved(true);
//		for (Slot slot : slots) {
//			System.out.println("Slot: "+slot.toString());
//		}

//		ItemSearchCriteria criteria = new ItemSearchCriteria();
//		criteria.setCity("");
//		criteria.setTextSearch("");
//		criteria.setZipCode("52074");
//
////		List<Item> items = itemRepository.itemSearch(criteria);
//
//		List<CustomItem> items = itemRepository.listUserItems(1);
//		for (CustomItem item : items) {
////			System.err.println("Item: " + item.getId()+" primaryImage = "+item.getPrimaryImage().getId());
//			System.err.println("Item: " + item.getPublishDate());
//		}
		
		
//		
//		
//		List<Image> images = itemRepository.listY();
//		for (Image image : images) {
////			System.err.println("Item: " + item.getId()+" primaryImage = "+item.getPrimaryImage().getId());
//			System.err.println("Image: " + image.getId());
//		}
		
		//itemRepository.listZ();

	}

}
