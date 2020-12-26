package com.projectx.xchangeit.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectx.xchangeit.repository.AddressRepository;
import com.projectx.xchangeit.restTemplate.XChangeItRestTemplate;
import com.projectx.xchangeit.service.AddressService;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {

	@Autowired
	AddressRepository addressRepository;

	@Autowired
	XChangeItRestTemplate restTemplate;

	private static final String OSM_ADDRESS_BY_ZIPCODE_URL = "https://nominatim.openstreetmap.org/?addressdetails=1&country=de&format=json&limit=1&postalcode=";

	@Override
	public void test() {
//		Optional<Address> address= addressRepository.findById(1);
		String x = getCityByZipCode("03096");
		System.out.println("city: " + x);
	}

	@Override
	public String getCityByZipCode(String zipCode) {
		String addressJSON = restTemplate.getEntityAsString(OSM_ADDRESS_BY_ZIPCODE_URL + zipCode);
		String city = "";
		try {
			city = getCityFromJSONAddress(addressJSON);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return city;
	}

	private String getCityFromJSONAddress(String addressJSON) throws JsonMappingException, JsonProcessingException {

		ObjectMapper mapper = new ObjectMapper();
		JsonNode root = mapper.readTree(addressJSON);
		if (root.size() == 0) {
			return "";
		}
		String city = root.get(0).path("address").path("county").asText();
		return city;
	}
}
