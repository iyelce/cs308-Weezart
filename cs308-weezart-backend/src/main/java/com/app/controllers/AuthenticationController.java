package com.app.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.filter.JwtTokenUtil;
import com.app.models.User;
import com.app.models.AuthenticationResponse;
import com.app.payloads.UserLoginPayload;
import com.app.payloads.UserRegisterPayload;
import com.app.repo.UserRepository;
import com.app.services.UserService;
import com.app.services.UserServiceImpl.CustomException;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/auth")
public class AuthenticationController {
	
	
	private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
    private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	public AuthenticationController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody UserRegisterPayload userPayload) {
        
		try {
			log.info("user register request sent");
			
			User createdUser = userService.createUser(userPayload.getUsername(), userPayload.getPassword(), userPayload.getEmail());
			
			log.info("user register request complete");
			return ResponseEntity.ok(createdUser);
		} catch (CustomException e) {
			log.info("user register request error");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginIndividual(@RequestBody UserLoginPayload loginUser) {
		try {
            // Authenticate the individual user and generate a token
			log.info("Auth    username: "+ loginUser.getUsername()+ "password: "+ loginUser.getPassword());
			Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword()));
			
			log.info("authentication passed");
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String ind = authentication.getName();
			log.info("auth:  " + authentication.toString());
            	          
            UserDetails userDetails = userDetailsService.loadUserByUsername(ind);
            
            User user = userRepo.findByUsername(loginUser.getUsername());
            Long userId = user.getiduser();
                       
            String token = jwtTokenUtil.generateToken(userDetails);
            AuthenticationResponse authResponse = new AuthenticationResponse(token, userId);
            
            log.info(token);
            log.info("TOKEN OLUSTU");
            return ResponseEntity.ok(authResponse);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
	
	@GetMapping("/profile/{userId}")
	public ResponseEntity<?> getUserProfileById(@PathVariable String userId) {
		
		try {
			User user = userService.getProfileById(userId);
							
			log.info("user RETURNED");
			return ResponseEntity.ok(user);
		} catch(CustomException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			
		}
	}
	
}
