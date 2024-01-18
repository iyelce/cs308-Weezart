package com.app.controllers;

import com.app.models.*;
import com.app.payloads.AlbumPayload;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;
import com.app.repo.*;
import com.app.services.LikeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class LikeControllerTest {

	private static final Logger log = LoggerFactory.getLogger(LikeControllerTest.class);
	
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // You might need to autowire other repositories, services, or mocks as required.

    @MockBean
    private AddControllerTest addTest;

    // You can autowire repositories or other dependencies as needed.

    @BeforeEach
    void setUp() {
        // You can perform any setup logic here if needed.
    }
 
    @Test
    void likeSong() throws Exception {
        // Given
        String userId = "32";

        Song likeSong = addTest.testAddSongManual();
        SongPayload songPayload = new SongPayload(likeSong);
        
        // When
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                .post("/like/song/{userId}", userId)
                .content(objectMapper.writeValueAsString(songPayload))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // Then
        String content = mvcResult.getResponse().getContentAsString();
        UserSong userSong = objectMapper.readValue(content, UserSong.class);

        log.info("content ", content);
        // Additional assertions or verifications as needed
    }

    // Similar tests for likeArtist and likeAlbum methods can be added.

    @Test
    void getLikeStatusSong() throws Exception {
        // Given
        String userId = "33";
        String songId = "4iokZFTx4hmvHsY1cExFgn";

        // When
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                .get("/like/song/get-like-info/{songId}/{userId}", songId, userId))
                .andExpect(status().isOk())
                .andReturn();

        // Then
        boolean likeStatus = Boolean.parseBoolean(mvcResult.getResponse().getContentAsString());
        if(likeStatus) {
        	log.info("true");
        	
        }else {
        	log.info("false");
        }

        log.info("liked: ", String.valueOf(likeStatus));
    }

}
