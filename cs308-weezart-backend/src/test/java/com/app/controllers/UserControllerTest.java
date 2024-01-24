package com.app.controllers;

import com.app.controllers.UserController;
import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserSong;
import com.app.services.AddService;
import com.app.services.UserService;
import com.app.services.UserServiceImpl.CustomException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.security.test.context.support.WithMockUser;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith({SpringExtension.class, MockitoExtension.class})
@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Mock
    private AddService addService;

    @InjectMocks
    private UserController userController;

    @Test
    @WithMockUser(username = "idily", password = "1234", roles = "{USER}")
    void testGetAddedSongsById() throws Exception {
        String userId = "33";

        mockMvc.perform(get("/user/added-songs/{userId}", userId))
                .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser(username = "idily", password = "1234", roles = "{USER}")
    void testGetAddedAlbumsById() throws Exception {
        String userId = "33";

        mockMvc.perform(get("/user/added-albums/{userId}", userId))
                .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser(username = "idily", password = "1234", roles = "{USER}")
    void testGetAddedArtistsById() throws Exception {
        String userId = "33";

        mockMvc.perform(get("/user/added-artists/{userId}", userId))
                .andExpect(status().isOk());
    }

    
    
    @Test
    @WithMockUser(username = "idily", password = "1234", roles = "{USER}")
    void testGetUserProfileById() throws Exception {
        String username = "idily";

        mockMvc.perform(get("/user/profile/{userId}", username))
                .andExpect(status().isOk());
    }

    
    
    
    private User createMockUser(long id, String username, String password, String email) {
        User user = new User();
        user.setiduser(id);
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        // Set other properties if needed
        return user;
    }


}

