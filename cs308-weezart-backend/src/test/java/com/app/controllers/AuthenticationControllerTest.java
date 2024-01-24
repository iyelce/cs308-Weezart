package com.app.controllers;

import com.app.controllers.AuthenticationController;
import com.app.filter.JwtTokenUtil;
import com.app.models.AuthenticationResponse;
import com.app.models.User;
import com.app.payloads.UserLoginPayload;
import com.app.payloads.UserRegisterPayload;
import com.app.repo.UserRepository;
import com.app.services.UserService;
import com.app.services.UserServiceImpl.CustomException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class AuthenticationControllerTest {

	@Autowired
    private MockMvc mockMvc;
	
	@Autowired
    private ObjectMapper objectMapper;
	
    @Mock
    private UserRepository userRepository;

    @Mock
    private UserService userService;

    @Mock
    private UserDetailsService userDetailsService;


    @Mock
    private JwtTokenUtil jwtTokenUtil;

    @InjectMocks
    private AuthenticationController authenticationController;

    @Test
    void testCreateUser() {
        // Mocking the userService to return a created user
        when(userService.createUser(any(), any(), any())).thenReturn(new User());

        // Create a user register payload
        UserRegisterPayload userRegisterPayload = new UserRegisterPayload();
        userRegisterPayload.setUsername("testUser");
        userRegisterPayload.setPassword("testPassword");
        userRegisterPayload.setEmail("test@example.com");

        // Perform the createUser request
        ResponseEntity<?> responseEntity = authenticationController.createUser(userRegisterPayload);

        // Verify that the userService.createUser method was called
        verify(userService, times(1)).createUser(any(), any(), any());

        // Verify the response status is OK
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
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

