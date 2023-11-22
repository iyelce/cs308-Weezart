package com.app.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

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
	    	if(userRepository.findByUsername(username) != null) {
	    		throw new CustomException("Username already exist");
	    	}
	    	
	    	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	    	String passwordHashed = passwordEncoder.encode(password);
	    	
	        User user = new User();
	        user.setUsername(username);
	        user.setPassword(passwordHashed);
	        user.setEmail(email);
	        user.setAuthority("ROLE_USER");
	        
	        log.info("username: " + username + "password :D : " + passwordHashed + "email: " + email);
	        
	        // Save the user to the database
	        return userRepository.save(user);
	    }
	    
	    public User loginUser(String username, String password) throws CustomException{
	    	
	    	User userDetails = userRepository.findByUsername(username); 
	    		    	
	    	if(userDetails == null) {
	    		throw new CustomException("Username is wrong");
	    	}
	    	
	    	if(!matchesPassword(password, userDetails.getPassword())) {
	    		
	    		log.info("exception thrown, wrong username or password");
	    		throw new CustomException("Password is wrong");
	    	}
	    	
	    	log.info("login successful?");    	
	    	return userRepository.findByUsername(username);
	    }
	    
	    private boolean matchesPassword(String password, String passwordHashed) {
	    		    	
	    	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	    	
	    	log.info("encoder initialized for password check");
	    	return passwordEncoder.matches(password, passwordHashed);
	    }
	    
	    public User getProfileById(String profileId) throws CustomException {
	    	
	    	if(userRepository.findByiduser(Long.parseLong(profileId)) != null){
	    		return userRepository.findByiduser(Long.parseLong(profileId));
	    	}
	    	else {throw new CustomException("Profile not found");}
		 }
	    
	    @ResponseStatus(HttpStatus.BAD_REQUEST)
	 	public class CustomException extends RuntimeException {
	 		private String message;

		    public CustomException(String message) {
		        this.message = message;
		    }

		    public String getMessage() {
		        return message;
		    }
		}
}
