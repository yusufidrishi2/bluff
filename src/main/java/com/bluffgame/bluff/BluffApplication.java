package com.bluffgame.bluff;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class BluffApplication {

	public static void main(String[] args) {
		SpringApplication.run(BluffApplication.class, args);
	}
}
