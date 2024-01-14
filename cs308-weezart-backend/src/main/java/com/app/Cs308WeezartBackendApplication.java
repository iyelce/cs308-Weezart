package com.app;

import javax.sql.DataSource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

@SpringBootApplication
@EntityScan("com.app")
@ComponentScan({"com.app", "com.app.services", "com.app.controllers", "com.app.security", "com.app.payloads"})
@EnableJpaRepositories("com.app.repo")

public class Cs308WeezartBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(Cs308WeezartBackendApplication.class, args);
    }
    
  
}
