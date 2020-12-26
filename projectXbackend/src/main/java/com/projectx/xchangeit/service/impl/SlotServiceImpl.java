package com.projectx.xchangeit.service.impl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectx.xchangeit.model.Slot;
import com.projectx.xchangeit.repository.SlotRepository;
import com.projectx.xchangeit.service.SlotService;

@Service
@Transactional
public class SlotServiceImpl implements SlotService {
	
	@Autowired
	SlotRepository slotRepository;
	
	

	@Override
	public Slot getSlotById(Integer id) {
		Optional<Slot> optionalSlot = slotRepository.findById(id);
		if (optionalSlot.isPresent()) {
			Slot slot = optionalSlot.get();
			return slot;
		} else {
			return null;
		}
	}



	@Override
	public List<Slot> findByReserved(Boolean reserved) {
		return slotRepository.findByReserved(reserved);
	}

}
