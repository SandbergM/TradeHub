package com.example.TradeHub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TradeHubApplication {
	public static void main(String[] args) {
		SpringApplication.run(TradeHubApplication.class, args);
		System.out.println("Server running on port 8080");
	}
}
