package com.app.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.app.models.User;
import com.app.repo.UserRepository;


public class UserServiceImpl implements UserService{
	 private final UserRepository userRepository;
	 
	 private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

	    public UserServiceImpl(UserRepository userRepository) {
	        this.userRepository = userRepository;
	    }
  
	    public User createUser(String username, String passwordHashed, String email) {
	        User user = new User();
	        user.setUsername(username);
	        user.setPasswordHashed(passwordHashed);
	        user.setEmail(email);
	        
	        log.info("username: " + username + "password :D : " + passwordHashed + "email: " + email);
	        
	        // Save the user to the database
	        return userRepository.save(user);
	    }


}
