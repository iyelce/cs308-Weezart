package com.app.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.app.services.UserServiceImpl;
import com.mysql.cj.log.Log;

@Configuration
public class SecurityConfig {
	
	private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Bean
	public PasswordEncoder encoder() {
	    return new BCryptPasswordEncoder();
	}
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		
		log.info("security içerdeyim");
		
		http.authorizeHttpRequests(authorize->authorize.requestMatchers("/auth/register", "/auth/login").permitAll().anyRequest().authenticated())
		.csrf(AbstractHttpConfigurer::disable)
        .anonymous(AbstractHttpConfigurer::disable);
		
		log.info("otorize ettiğimi düşünüyorum, return eyleyeceğim");
		
		return http.build();
	}
	
}
