package com.projectx.xchangeit.service;

import java.util.List;

import com.projectx.xchangeit.model.Slot;

public interface SlotService {

	Slot getSlotById(Integer id);
	
	List<Slot> findByReserved(Boolean reserved);
	

}
