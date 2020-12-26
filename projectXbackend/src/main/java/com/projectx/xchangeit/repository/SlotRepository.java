package com.projectx.xchangeit.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.projectx.xchangeit.model.Slot;

public interface SlotRepository extends CrudRepository<Slot, Integer>{
	
	List<Slot> findByReserved(Boolean reserved);

}