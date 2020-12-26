package com.projectx.xchangeit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.projectx.xchangeit.config.AppProperties;

@SpringBootApplication
@EnableScheduling
@EnableConfigurationProperties(AppProperties.class)
public class XChangeItApplication {

	public static void main(String[] args) {
		SpringApplication.run(XChangeItApplication.class, args);
		System.out.println("XChangeIt started");
	}

}
