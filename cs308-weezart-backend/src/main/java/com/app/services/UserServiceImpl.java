package com.app.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.models.User;
import com.app.repo.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	 private final UserRepository userRepository;
	 
	 private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

	    public UserServiceImpl(UserRepository userRepository) {
	        this.userRepository = userRepository;
	    }
  
	    public User createUser(String username, String password, String email) {
	    	
	    	log.info("hi!");
	    	
	    	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	    	String passwordHashed = passwordEncoder.encode(password);
	    	
	        User user = new User();
	        user.setUsername(username);
	        user.setPassword(passwordHashed);
	        user.setEmail(email);
	        
	        log.info("username: " + username + "password :D : " + passwordHashed + "email: " + email);
	        
	        // Save the user to the database
	        return userRepository.save(user);
	    }
	    
	    public User loginUser(String username, String password) {
	    	
	    	//TODO: IMPLEMENT LOGIN
	    	
	    	User user = new User();
	    	
	    	return userRepository.save(user);
	    }
}
