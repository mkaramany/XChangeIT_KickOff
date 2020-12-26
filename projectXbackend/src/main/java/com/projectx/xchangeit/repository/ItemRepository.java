package com.projectx.xchangeit.repository;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.projectx.xchangeit.model.Item;

public interface ItemRepository extends CrudRepository<Item, Integer> , CustomItemRepository {

	@Query("select i from Item i inner join i.slots s where i.status= ?1 and s.reserved = ?2 and s.dateValue = ?3 and s.toValue < ?4")
	List<Item> listReservedAndAppointmentReached(String status, Boolean reserved, Date date, Time time);
	

}
