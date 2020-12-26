package com.projectx.xchangeit.restTemplate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class XChangeItRestTemplate {

	private RestTemplate restTemplate;

	@Autowired
	public XChangeItRestTemplate(RestTemplateBuilder builder) {
		this.restTemplate = builder.build();
	}
	
	public String getEntityAsString(String url) {

		ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
		return response.getBody();
	}

}
