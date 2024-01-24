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
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class GroupSongControllerTest {
	
	 @Autowired
	 private MockMvc mockMvc;

	 @Autowired
	 private ObjectMapper objectMapper;
	 
	 @Autowired
	 private 
	    @Test
	    void createPlaylistController() throws Exception {
	        String userIds = "1,2,3";
	        mockMvc.perform(MockMvcRequestBuilders.post("/playlist/create/{userIds}", userIds));
	    }

	    @Test
	    void returnPlaylistController() throws Exception {
	        String userIds = "1,2,3";
	        mockMvc.perform(MockMvcRequestBuilders.get("/playlist/return/{userIds}", userIds));
	    }

	    @Test
	    void deleteGroupController() throws Exception {
	        String userIds = "1,2,3";
	        String deletedId = "4";
	        mockMvc.perform(MockMvcRequestBuilders.delete("/playlist/delete/{userIds}/{deletedId}", userIds, deletedId));
	    }

	    @Test
	    void getAllController() throws Exception {
	        String userId = "1";
	        mockMvc.perform(MockMvcRequestBuilders.get("/playlist/getAll/{id}", userId));
	    }

	    @Test
	    void analysisPlaylistController() throws Exception {
	        String userIds = "1,2,3";
	        mockMvc.perform(MockMvcRequestBuilders.get("/playlist/analysis/{userIds}", userIds));
	    }

}
