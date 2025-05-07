package com.a406.pocketing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;

@SpringBootApplication
@EnableRetry
public class PocketingApplication {

    public static void main(String[] args) {
        SpringApplication.run(PocketingApplication.class, args);
    }

}
