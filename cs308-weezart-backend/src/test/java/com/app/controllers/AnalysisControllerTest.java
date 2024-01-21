package com.app.controllers;

import com.app.services.AnalysisService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

//...

import static org.junit.jupiter.api.Assertions.assertEquals;

//...

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class AnalysisControllerTest {

 @Autowired
 private MockMvc mockMvc;

 @Autowired
 private ObjectMapper objectMapper;

 @Test
 void dailySongsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Long> expectedDailyAddedSongs = createTestDailyAddedSongs();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/song/daily-added/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Long> resultDailyAddedSongs = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Long.class)
     );

     // Assertions
     assertEquals(expectedDailyAddedSongs.size(), resultDailyAddedSongs.size());
 }

 private Map<String, Long> createTestDailyAddedSongs() {
     Map<String, Long> testData = new HashMap<>();
     testData.put("2023-12-30", 3L);
     return testData;
 }

 @Test
 void dailyLikedSongsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Long> expectedDailyLikedSongs = createTestDailyLikedSongs();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/song/daily-liked/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Long> resultDailyLikedSongs = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Long.class)
     );

     // Assertions
     assertEquals(expectedDailyLikedSongs.size(), resultDailyLikedSongs.size());
 }

 private Map<String, Long> createTestDailyLikedSongs() {
     Map<String, Long> testData = new HashMap<>();
     testData.put("2024-01-21", 1L);
     return testData;
 }

 @Test
 void dailyAverageRatingAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Double> expectedDailyAverageRating = createTestDailyAverageRating();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/song/daily-rating/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Double> resultDailyAverageRating = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Double.class)
     );

     // Assertions
     assertEquals(expectedDailyAverageRating.size(), resultDailyAverageRating.size());
 }

 private Map<String, Double> createTestDailyAverageRating() {
     Map<String, Double> testData = new HashMap<>();
     testData.put("2024-01-21", 5.0D);
     return testData;
 }
 
 
 //-------------------------------------------------------------
 
 @Test
 void dailyAlbumsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Long> expectedDailyAddedAlbums = createTestDailyAddedAlbums();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/album/daily-added/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Long> resultDailyAddedAlbums = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Long.class)
     );

     // Assertions
     assertEquals(expectedDailyAddedAlbums.size(), resultDailyAddedAlbums.size());

 }

 private Map<String, Long> createTestDailyAddedAlbums() {
     Map<String, Long> testData = new HashMap<>();
     testData.put("2023-12-30", 3L);
     return testData;
 }

 @Test
 void dailyLikedAlbumsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Long> expectedDailyLikedAlbums = createTestDailyLikedAlbums();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/album/daily-liked/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Long> resultDailyLikedAlbums = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Long.class)
     );

     // Assertions
     assertEquals(expectedDailyLikedAlbums.size(), resultDailyLikedAlbums.size());
 }

 private Map<String, Long> createTestDailyLikedAlbums() {
     Map<String, Long> testData = new HashMap<>();
     testData.put("2024-01-21", 1L);
     return testData;
 }

 @Test
 void dailyAverageRatingAlbumsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Double> expectedDailyAverageRating = createTestDailyAverageRatingAlbum();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/album/daily-rating/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Double> resultDailyAverageRating = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Double.class)
     );

     // Assertions
     assertEquals(expectedDailyAverageRating.size(), resultDailyAverageRating.size());
 }

 private Map<String, Double> createTestDailyAverageRatingAlbum() {
     Map<String, Double> testData = new HashMap<>();
     testData.put("2024-01-21", 5.0D);
     return testData;
 }
 
 //-------------------------------------------------

 @Test
 void dailyArtistsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Long> expectedDailyAddedArtists = createTestDailyAddedArtists();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/artist/daily-added/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Long> resultDailyAddedArtists = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Long.class)
     );

     // Assertions
     assertEquals(expectedDailyAddedArtists.size(), resultDailyAddedArtists.size());
 }

 private Map<String, Long> createTestDailyAddedArtists() {
     Map<String, Long> testData = new HashMap<>();
     testData.put("2023-12-30", 2L);
     return testData;
 }

 @Test
 void dailyLikedArtistsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Long> expectedDailyLikedArtists = createTestDailyLikedArtists();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/artist/daily-liked/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Long> resultDailyLikedArtists = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Long.class)
     );

     // Assertions
     assertEquals(expectedDailyLikedArtists.size(), resultDailyLikedArtists.size());
 }

 private Map<String, Long> createTestDailyLikedArtists() {
     Map<String, Long> testData = new HashMap<>();
     testData.put("2024-01-21", 1L);
     return testData;
 }

 @Test
 void dailyAverageRatingArtistsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Double> expectedDailyAverageRatingArtists = createTestDailyAverageRatingArtists();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/artist/daily-rating/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Double> resultDailyAverageRatingArtists = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Double.class)
     );

     // Assertions
     assertEquals(expectedDailyAverageRatingArtists.size(), resultDailyAverageRatingArtists.size());
 }

 private Map<String, Double> createTestDailyAverageRatingArtists() {
     Map<String, Double> testData = new HashMap<>();
     testData.put("2024-01-21", 4.5D);
     return testData;
 }
 
 
}
