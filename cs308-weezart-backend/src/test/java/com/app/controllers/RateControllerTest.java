package com.app.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import com.app.payloads.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class RateControllerTest {
	
	@Autowired
    private MockMvc mockMvc;
	
	@Autowired
    private ObjectMapper objectMapper;


    @Test
    @WithMockUser(username = "umut", password = "umut123", roles = "{USER}")
    void getRateStatusSong() throws Exception {
        // Given
        String songId = "2JhJOPGvtqMpj5RQC8cIYf";
        String userId = "32";

        // When
        mockMvc.perform(MockMvcRequestBuilders
                .get("/rate/song/get-rate-info/{songId}/{userId}", songId, userId))
		        .andExpect(status().isOk())
		        .andReturn();
    }

    @Test
    @WithMockUser(username = "umut", password = "umut123", roles = "{USER}")
    void getRateStatusAlbum() throws Exception {
        // Given
        String albumId = "5cT7ee1sy2oEbFalP4asS4";
        String userId = "32";

        // When
        mockMvc.perform(MockMvcRequestBuilders
                .get("/rate/album/get-rate-info/{albumId}/{userId}", albumId, userId))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    @WithMockUser(username = "umut", password = "umut123", roles = "{USER}")
    void getRateStatusArtist() throws Exception {
        // Given
        String artistId = "568ZhdwyaiCyOGJRtNYhWf";
        String userId = "32";

        // When
        mockMvc.perform(MockMvcRequestBuilders
                .get("/rate/artist/get-rate-info/{artistId}/{userId}", artistId, userId))
		        .andExpect(status().isOk())
		        .andReturn();
    }
}
