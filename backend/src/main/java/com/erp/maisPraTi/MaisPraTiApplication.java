package com.erp.maisPraTi;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MaisPraTiApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		System.setProperty("jwt.secret", dotenv.get("JWT_SECRET"));
		System.setProperty("jwt.expiration", dotenv.get("JWT_EXPIRATION"));
		System.setProperty("jwt.expiration-recovery", dotenv.get("JWT_EXPIRATION_RECOVERY"));
		System.setProperty("spring.profiles.active", dotenv.get("APP_PROFILE"));
		System.setProperty("spring.mail.username", dotenv.get("EMAIL_PASSWORD"));
		System.setProperty("spring.mail.password", dotenv.get("EMAIL_PASSWORD"));

		SpringApplication.run(MaisPraTiApplication.class, args);
	}

}
