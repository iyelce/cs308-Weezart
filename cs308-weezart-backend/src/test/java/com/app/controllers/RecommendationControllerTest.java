package com.app.controllers;

import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.DateRange;
import com.app.models.FriendNameAndSongs;
import com.app.models.Song;
import com.app.services.AnalysisService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

//...

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class RecommendationControllerTest {
	
	 @Autowired
	 private MockMvc mockMvc;

	 @Autowired
	 private ObjectMapper objectMapper;
	 
	 
	    @Test
	    void popularRecommendationController() throws Exception {
	        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
	                .get("/recommendation/popular"))
	                .andExpect(status().isOk())
	                .andReturn();

	        List<Song> resultPopularSongs = objectMapper.readValue(
	                mvcResult.getResponse().getContentAsString(),
	                objectMapper.getTypeFactory().constructCollectionType(List.class, Song.class)
	        );

	        assertEquals(10, resultPopularSongs.size());
	    }

	    @Test
	    void hotRecommendationController() throws Exception {
	        String userId = "50";
	        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
	                .get("/recommendation/hot/{userId}", userId))
	                .andExpect(status().isOk())
	                .andReturn();

	        List<Song> resultHotSongs = objectMapper.readValue(
	                mvcResult.getResponse().getContentAsString(),
	                objectMapper.getTypeFactory().constructCollectionType(List.class, Song.class)
	        );

	        assertEquals(10, resultHotSongs.size());
	    }

	    @Test
	    void releaseDateRecommendationController() throws Exception {
	        String userId = "50";
	        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
	                .get("/recommendation/release-date/{userId}", userId))
	                .andExpect(status().isOk())
	                .andReturn();

	        List<Album> resultReleaseDateAlbums = objectMapper.readValue(
	                mvcResult.getResponse().getContentAsString(),
	                objectMapper.getTypeFactory().constructCollectionType(List.class, Album.class)
	        );

	        assertTrue(resultReleaseDateAlbums.size() <= 5);
	    }


	    @Test
	    void artistGenreRecommendationController() throws Exception {
	        String userId = "50";
	        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
	                .get("/recommendation/genre-artist/{userId}", userId))
	                .andExpect(status().isOk())
	                .andReturn();

	        List<Artist> resultArtistGenreRecommendation = objectMapper.readValue(
	                mvcResult.getResponse().getContentAsString(),
	                objectMapper.getTypeFactory().constructCollectionType(List.class, Artist.class)
	        );

	        assertTrue(resultArtistGenreRecommendation.size() <= 5);
	    }

}
