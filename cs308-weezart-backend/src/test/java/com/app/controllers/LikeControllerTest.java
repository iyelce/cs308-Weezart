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
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Transactional
@Rollback
class LikeControllerTest {

	private static final Logger log = LoggerFactory.getLogger(LikeControllerTest.class);
	
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;


    @MockBean
    private AddControllerTest addTest;


    @BeforeEach
    void setUp() {
    }
 

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
    
    @Test
    void getLikeStatusAlbum() throws Exception {
        // Given
        String userId = "33";
        String songId = "6TcPqftScGmR0aEgIb43Vv";

        // When
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
        		.get("/like/album/get-like-info/{albumId}/{userId}", songId, userId))
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
    
    @Test
    void getLikeStatusArtist() throws Exception {
        // Given
        String userId = "33";
        String songId = "3fMbdgg4jU18AjLCKBhRSm";

        // When
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                .get("/like/artist/get-like-info/{artistId}/{userId}", songId, userId))
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
